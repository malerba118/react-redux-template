import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { PrivateRoute, Notifications } from 'components/App/Shared'
import { LoginPage, PostListPage, FavoritePostsPage, AdminPage, Forbidden, Toolbar } from './Views'
import { rolesEnum } from 'enums'
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
            <Notifications />
            <Route
              exact
              path="/login"
              component={LoginPage}
            />
            <PrivateRoute
              permittedRoles={[rolesEnum.Admin, rolesEnum.Author]}
              exact
              path="/"
              component={PostListPage}
            />
            <PrivateRoute
              permittedRoles={[rolesEnum.Admin, rolesEnum.Author]}
              exact
              path="/favorites"
              component={FavoritePostsPage}
            />
            <PrivateRoute
              permittedRoles={[rolesEnum.Admin]}
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
