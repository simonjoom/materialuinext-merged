// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import Paper from '../Paper';

export const styleSheet = createStyleSheet('AppBar', (theme) => {
  const { palette } = theme;

  return {
    appBar: {
       display: 'flex',
      flexDirection: 'column',
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: theme.zIndex.appBar,
    },
    primary: {
      backgroundColor: palette.primary[500],
      color: palette.getContrastText(palette.primary[500]),
    },
    accent: {
      backgroundColor: palette.accent.A200,
      color: palette.getContrastText(palette.accent.A200),
    },
  };
});

export default class AppBar extends Component {
  static propTypes = {
    accent: PropTypes.bool,
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    primary: PropTypes.bool,
  };

  static defaultProps = {
    accent: false,
    primary: true,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const {
      accent,
      children,
      className: classNameProp,
      primary,
      ...other
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);

    const className = classNames({
      [classes.appBar]: true,
      [classes.primary]: primary && !accent,
      [classes.accent]: accent,
    }, classNameProp);

    return (
      <Paper
        rounded={false}
        zDepth={4}
        className={className}
        {...other}
      >
        {children}
      </Paper>
    );
  }
}
