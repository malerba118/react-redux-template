import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  actions as apiActions,
  selectors as apiSelectors
} from 'store/api'
import { Switch, Route } from 'react-router-dom'
import { PrivateRoute } from 'components/App/Shared'
import { LoginPage, PostListPage, AdminPage, Forbidden, Toolbar } from './Views'
import { rolesEnum } from 'enums/authEnums'
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from './theme'

import styles from './App.module.css'; // Import css modules stylesheet as styles

class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className={styles.app}>
          <Toolbar />
          <div className={styles.body}>
            <Route
              exact
              path="/login"
              component={LoginPage}
            />
            <PrivateRoute
              permittedRoles={[rolesEnum.ADMIN, rolesEnum.AUTHOR]}
              exact
              path="/"
              component={PostListPage}
            />
            <PrivateRoute
              permittedRoles={[rolesEnum.ADMIN]}
              exact
              path="/admin"
              component={AdminPage}
            />
            <Route
              exact
              path="/forbidden"
              component={Forbidden}
            />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
