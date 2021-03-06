// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import Button from 'material-ui/Button';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

const styleSheet = createStyleSheet('AlertDialogSlide', () => ({
  alert: {
    maxWidth: 400,
  },
  content: {
    margin: 0,
  },
}));

export default class AlertDialogSlide extends Component {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  state = {
    open: false,
  };

  handleRequestClose = () => this.setState({ open: false });

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    return (
      <div>
        <Button onClick={() => this.setState({ open: true })}>
          Slide in alert dialog
        </Button>
        <Dialog
          className={classes.alert}
          open={this.state.open}
          transition={Slide}
          onRequestClose={this.handleRequestClose}
        >
          <DialogTitle>{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <p className={classes.content}>
              Let Google help apps determine location.
              This means sending anonymous location data
              to Google, even when no apps are running.
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} primary>Disagree</Button>
            <Button onClick={this.handleRequestClose} primary>Agree</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

