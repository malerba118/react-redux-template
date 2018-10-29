import React from 'react';
import { connect } from 'react-redux'
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
