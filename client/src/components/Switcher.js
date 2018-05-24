import * as React from 'react'
import { connect } from 'react-redux'
import universal from 'react-universal-component'

const errorPages = ['NotFound', 'Forbidden']

const Loading = () => (<div className="lds-dual-ring"><div></div></div>)

const UniversalComponent = universal(({ page }) =>
  import(`../containers/${page}`), { minDelay: 0, loading: <Loading/>})

const Switcher = ({ page }) => {
  // todo rewrite this...
  return (
    <div className={
    (errorPages.includes(page)
      ? 'page-wrapper error-page-wrapper'
      : page !== 'Login'
        ? 'page-wrapper'
        : '')}>
      <UniversalComponent page={page}/>
  </div>
  )
}
const mapStateToProps = ({ page }) => ({ page})

export default connect(mapStateToProps)(Switcher)
