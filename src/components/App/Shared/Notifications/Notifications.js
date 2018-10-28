import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import blue from '@material-ui/core/colors/blue';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';
import isEqual from 'lodash/isEqual'
import { Notification } from 'components/Universal'
import { actions as notificationActions, selectors as notificationSelectors } from 'store/other/notifications'


class Notifications extends React.Component {

  hideNotification = () => {
    this.props.hideNotification(this.props.notification)
  }

  render() {
    return (
      <Notification notification={this.props.notification} onClose={this.hideNotification} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: notificationSelectors.getMostRecent(state)
  }
}

const mapDispatchToProps = {
  hideNotification: notificationActions.hideNotification,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications)
