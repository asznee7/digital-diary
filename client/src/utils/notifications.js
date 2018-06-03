import React from 'react'
import Notifications from 'react-notification-system-redux';

export const notificationOptionsError = message => ({
  title: 'Error',
  message: message,
  autoDismiss: 10,
  position: 'br'
})

export const notificationOptionsSuccess = message => ({
  title: 'Success',
  message: message,
  autoDismiss: 10,
  position: 'br'
})

const style = {
  NotificationItem: {
    DefaultStyle: {
      margin: '15px 10px 2px 1px'
    }
  }
}

const Notification = ({ notifications }) => (
  <Notifications
    notifications={notifications}
    style={style}
  />
)

export default Notification
