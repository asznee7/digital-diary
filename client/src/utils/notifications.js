import React from 'react'
import Notifications from 'react-notification-system-redux';

export const notificationOptionsError = message => ({
  title: 'Error',
  message: message,
  autoDismiss: 10,
})

export const notificationOptionsSuccess = message => ({
  title: 'Success',
  message: message,
  autoDismiss: 10,
})

const style = {
  NotificationItem: {
    DefaultStyle: {
      margin: '15px 10px 2px 1px'
    }
  }
}

export default Notification = ({ notifications }) => (
  <Notifications
    notifications={notifications}
    style={style}
  />
)
