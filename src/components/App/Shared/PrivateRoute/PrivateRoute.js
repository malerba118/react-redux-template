import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectors as sessionSelectors } from 'store/other/session'
import { intersection } from 'lodash'

const LOGIN_PATH = '/login'
const FORBIDDEN_PATH = '/forbidden'

// Example Usage:
//
// import { PrivateRoute } from 'components/App/Shared'
//
// <PrivateRoute
//   path="/admin"
//   permittedRoles={[rolesEnum.Admin]}
//   component={AdminPage}
// />
class PrivateRoute extends React.Component {

  render () {
    let {
      component: Component,
      user,
      permittedRoles,
      location,
      ...other
    } = this.props

    return (
      <Route
        {...other}
        render={(props) => {
            if (user == null) {
              return <Redirect to={{pathname: LOGIN_PATH, state: {from: location}}} />
            } else if (intersection(permittedRoles, user.roles).length === 0 ) {
              return <Redirect to={{pathname: FORBIDDEN_PATH, state: {from: location}}} />
            }
            return <Component {...props} />
          }
        }
      />
    )
  }
}

PrivateRoute.defaultProps = {
  permittedRoles: [],
  user: null,
}

const mapStateToProps = (state) => {
  const session = sessionSelectors.getSession(state)
  return {
    user: session ? session.user : null
  }
}

const mapDispatchToProps = {

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PrivateRoute))
