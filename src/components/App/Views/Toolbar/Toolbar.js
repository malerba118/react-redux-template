import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  actions as apiActions,
  selectors as apiSelectors
} from 'store/api'
import { selectors as sessionSelectors } from 'store/other/session'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Grid, Button } from '@material-ui/core'
import { isAuthenticated } from 'utils/authUtils'
import { FlatButton } from 'components/Universal'

import styles from './Toolbar.module.css';


class Toolbar extends Component {

  logOut = () => {
    this.props.logOut()
      .then(() => {
        this.props.history.push('/login')
      })
  }

  goTo = (path) => {
    this.props.history.push(path)
  }

  render() {
    const isAuthed = isAuthenticated(this.props.session)
    return (
      <div className={styles.Toolbar}>
        <FlatButton
          className={styles.toolbarButton}
          onClick={() => this.goTo('/')}
        >
          Sample App
        </FlatButton>
        {isAuthed && (
          <div className={styles.right}>
            <FlatButton
              hoverTone="dark"
              className={styles.toolbarButton}
              onClick={() => this.goTo('/favorites')}
            >
              Favorites
            </FlatButton>
            <FlatButton
              hoverTone="dark"
              className={styles.toolbarButton}
              onClick={this.logOut}
            >
              Log Out
            </FlatButton>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    session: sessionSelectors.getSession(state)
  }
}

const mapDispatchToProps = {
  logOut: apiActions.logOut,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Toolbar))
