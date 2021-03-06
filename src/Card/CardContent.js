// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('CardContent', () => ({
  cardContent: {
    '&:last-child': {
      paddingBottom: 24,
    },
  },
}));

export default function CardContent(props, context) {
  const {
    className: classNameProp,
    ...other
  } = props;

  const classes = context.styleManager.render(styleSheet);
  const className = classNames(classes.cardContent, classNameProp);

  return (
    <div className={className} {...other} />
  );
}

CardContent.propTypes = {
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
};

CardContent.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
