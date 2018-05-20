import * as React from 'react'

const styles = {
  displayErrors: {
    borderColor: '#ff4343',
    boxShadow: 'inset 0 0 3px red'
  }
}

export const renderField = ({ input, label, type, disabled, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input style={touched && error ? styles.displayErrors : null} {...input} type={type} disabled={disabled} />
    </div>
  </div>
)
