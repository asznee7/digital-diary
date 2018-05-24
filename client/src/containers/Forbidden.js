import * as React from 'react'

class Forbidden extends React.Component {
  render () {
    return (
      <div className='error'>
        <div>You don't have permission to access this page</div>
        <h1>403</h1>
      </div>
    )
  }
}

export default Forbidden
