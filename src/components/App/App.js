import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  actions as apiActions,
  selectors as apiSelectors
} from 'store/ducks/api'

import styles from './App.module.scss'; // Import css modules stylesheet as styles


class App extends Component {

  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    if (this.props.posts == null) {
      return <div>Loading...</div>
    }
    return (
      <div className={styles.App}>
        <header className={styles.AppHeader}>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className={styles.AppLink}
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {this.props.posts.map((post) => (
            <p key={post.id}>
              {post.title}
            </p>
          ))}
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: apiSelectors.getPosts(state),
    isGetPostsPending: apiSelectors.isGetPostsPending(state)
  }
}

const mapDispatchToProps = {
  getPosts: apiActions.getPosts,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
