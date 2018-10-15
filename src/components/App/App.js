import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  actions as apiActions,
  selectors as apiSelectors
} from 'store/api'
import { Switch, Route } from 'react-router-dom'
import { LoginPage, PostListPage } from './Views'
import styles from './App.module.scss'; // Import css modules stylesheet as styles


class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/" component={PostListPage} />
      </div>
    )
  }
}

export default App
