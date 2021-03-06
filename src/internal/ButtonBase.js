/* eslint-disable flowtype/require-valid-file-annotation */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import createFragment from 'react-addons-create-fragment';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import keycode from 'keycode';
import addEventListener from '../utils/addEventListener';
import { TouchRipple, createRippleHandler } from '../Ripple';
let listening = false;
let focusKeyPressed = false;
function isFocusKey(event) {
  return ['tab', 'enter', 'space', 'esc', 'up', 'down', 'left', 'right'].indexOf(keycode(event)) !== -1;
}
function listenForFocusKeys() {
  if (!listening) {
    addEventListener(window, 'keyup', (event) => {
      if (isFocusKey(event)) {
        focusKeyPressed = true;
      }
    });
    listening = true;
  }
}
export const styleSheet = createStyleSheet('ButtonBase', () => {
  return {
    buttonBase: {
      position: 'relative',
      WebkitTapHighlightColor: 'rgba(0,0,0,0.0)',
      outline: 'none',
      border: 0,
      cursor: 'pointer',
      userSelect: 'none',
      appearance: 'none',
      textDecoration: 'none',
    },
    disabled: {
      cursor: 'not-allowed',
    },
  };
});
export default class ButtonBase extends Component {
  static propTypes = {
    centerRipple: PropTypes.bool,
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    disabled: PropTypes.bool,
    focusRipple: PropTypes.bool,
    keyboardFocusedClassName: PropTypes.string,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyboardFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseUp: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onTouchStart: PropTypes.func,
    ripple: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    role: PropTypes.string,
    tabIndex: PropTypes.string,
    type: PropTypes.string,
  };
  static defaultProps = {
    centerRipple: false,
    component: 'button',
    focusRipple: false,
    ripple: true,
    tabIndex: '0',
    type: 'button',
  };
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };
  state = {
    keyboardFocused: false,
  };
  
  isKeyboardFocused() {
    return this.state.keyboardFocused;
  }
  
  componentDidMount() {
    listenForFocusKeys();
  }
  
  componentWillUpdate(nextProps, nextState) {
    if (this.props.focusRipple) {
      if (nextState.keyboardFocused && !this.state.keyboardFocused) {
        this.ripple.pulsate();
      }
    }
  }
  
  componentWillUnmount() {
    clearTimeout(this.keyboardFocusTimeout);
  }
  
  ripple = undefined;
  keyDown = false; // Used to help track keyboard activation keyDown
  button = null;
  keyboardFocusTimeout = undefined;
  handleKeyDown = (event) => {
    const { component, focusRipple, onKeyDown, onClick } = this.props;
    const key = keycode(event);
    // Check if key is already down to avoid repeats being counted as multiple activations
    if (focusRipple && !this.keyDown && this.state.keyboardFocused && key === 'space') {
      this.keyDown = true;
      event.persist();
      this.ripple.stop(event, () => {
        this.ripple.start(event);
      });
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
    // Keyboard accessibility for non interactive elements
    if (
      onClick &&
      component !== 'a' &&
      component !== 'button' &&
      (key === 'space' || key === 'enter')
    ) {
      event.preventDefault();
      onClick(event);
    }
  };
  handleClick = (event) => {
    if (this.prevent)
      event.preventDefault();
    console.log("click");
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  }
  handleKeyUp = (event) => {
    if (this.props.focusRipple && keycode(event) === 'space' && this.state.keyboardFocused) {
      this.keyDown = false;
      event.persist();
      this.ripple.stop(event, () => this.ripple.pulsate(event));
    }
    if (this.props.onKeyUp) {
      this.props.onKeyUp(event);
    }
  };
  handleMouseDown = (event)=> {
    console.log("how many?");
    createRippleHandler(event, this, 'MouseDown', 'start', () => {
      clearTimeout(this.keyboardFocusTimeout);
      focusKeyPressed = false;
      if (this.state.keyboardFocused) {
        this.setState({ keyboardFocused: false });
      }
    });
    if (this.props.onMouseDown) {
      this.props.onMouseDown(event);
    }
  };
  handleMouseUp = (event)=> {
    setTimeout(createRippleHandler(event, this, 'MouseUp', 'stop'), 550);
    if (this.props.onMouseUp) {
      this.props.onMouseUp(event);
    }
  };
  handleMouseLeave = (event)=> {
    createRippleHandler(event, this, 'MouseLeave', 'stop', (event) => {
      if (this.state.keyboardFocused) {
        event.preventDefault();
      }
    })
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
  };
  handleTouchStart = (event)=> {
    createRippleHandler(event, this, 'TouchStart', 'start');
  }
  handleTouchEnd = (event)=> {
    createRippleHandler(event, this, 'TouchEnd', 'stop');
  }
  handleBlur = (event)=> {
    createRippleHandler(event, this, 'Blur', 'stop', () => {
      this.setState({ keyboardFocused: false });
    });
  }
  handleFocus = (event) => {
    if (!this.props.disabled) {
      // setTimeout is needed because the focus event fires
      // first if focus was called programatically inside a keydown handler
      event.persist();
      setTimeout(() => {
        if (focusKeyPressed && document.activeElement === ReactDOM.findDOMNode(this.button)) {
          this.keyDown = false;
          focusKeyPressed = false;
          this.setState({ keyboardFocused: true });
          if (this.props.onKeyboardFocus) {
            this.props.onKeyboardFocus(event);
          }
        }
      }, 150);
      if (this.props.onFocus) {
        this.props.onFocus(event);
      }
    }
  };
  
  renderRipple(ripple, classNameRipple) {
    if (ripple === true && !this.props.disabled) {
      return <TouchRipple ref={(c) => {
        this.ripple = c;
      }} center={true} className={classNameRipple}/>;
    }
    return null;
  }
  
  render() {
    const {
      centerRipple,
      children,
      className: classNameProp,
      component,
      disabled,
      focusRipple, // eslint-disable-line no-unused-vars
      keyboardFocusedClassName,
      onBlur, // eslint-disable-line no-unused-vars
      onFocus, // eslint-disable-line no-unused-vars
      onKeyDown, // eslint-disable-line no-unused-vars
      onKeyUp, // eslint-disable-line no-unused-vars
      onMouseDown, // eslint-disable-line no-unused-vars
      onMouseLeave, // eslint-disable-line no-unused-vars
      onMouseUp, // eslint-disable-line no-unused-vars
      onTouchEnd, // eslint-disable-line no-unused-vars
      onTouchStart, // eslint-disable-line no-unused-vars
      onKeyboardFocus,
      hoverColor,
      secondary,
      classNameRipple,
      ripple,
      type,
      ...other
    } = this.props;
    const classes = this.context.styleManager.render(styleSheet);
    const className = classNames(classes.buttonBase, {
      [classes.disabled]: disabled,
      [keyboardFocusedClassName]: keyboardFocusedClassName && this.state.keyboardFocused,
    }, classNameProp);
    const buttonProps = {
      ref: (c) => {
        this.button = c;
      },
      onBlur: this.handleBlur,
      onFocus: this.handleFocus,
      onKeyDown: this.handleKeyDown,
      onKeyUp: this.handleKeyUp,
      onClick: this.handleClick,
      onMouseDown: this.handleMouseDown,
      onMouseLeave: this.handleMouseLeave,
      onMouseUp: this.handleMouseUp,
      onTouchEnd: this.handleTouchEnd,
      onTouchStart: this.handleTouchStart,
      tabIndex: this.props.tabIndex,
      className,
      ...other,
    };
    let element = component;
    if (other.href !== undefined) {
      if (other.href === "")
        this.prevent = true;
      element = 'a';
    }
    if (element === 'button') {
      buttonProps.type = type;
      buttonProps.disabled = disabled;
    } else if (element !== 'a') {
      buttonProps.role = this.props.hasOwnProperty('role') ? this.props.role : 'button';
    }
    return React.createElement(
      element,
      buttonProps,
      createFragment({
        ripple: this.renderRipple(ripple, classNameRipple),
        children
      })
    );
  }
}
