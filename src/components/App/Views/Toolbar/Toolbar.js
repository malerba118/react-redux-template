import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  actions as apiActions,
  selectors as apiSelectors
} from 'store/api'
import { selectors as sessionSelectors } from 'store/other/session'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Grid, Button } from '@material-ui/core'

import styles from './Toolbar.module.css';


class Toolbar extends Component {

  logOut = () => {
    this.props.logOut()
      .then(() => {
        this.props.history.push('/login')
      })
  }

  render() {
    return (
      <div className={styles.Toolbar}>
        <span>
          Sample App
        </span>
        <Button onClick={this.logOut}>
          Log Out
        </Button>
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
