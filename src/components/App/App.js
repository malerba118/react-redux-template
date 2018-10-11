import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  actions as apiActions,
  selectors as apiSelectors
} from 'store/ducks/api'
import { DB } from 'store/db'

import styles from './App.module.scss'; // Import css modules stylesheet as styles


class App extends Component {

  componentDidMount() {
    this.props.getPosts()
    this.props.createPost({
      id: 999,
      title: 'idk',
      author: {
        id: 2,
        name: 'Austin',
        email: 'frostinmalaria@gmail.com',
      }
    })
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
              {post.title} - {post.author && post.author.name}
            </p>
          ))}
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let db = new DB(state)
  return {
    posts: db.getPosts(),
    isGetPostsPending: apiSelectors.getPostsPending(state)
  }
}

const mapDispatchToProps = {
  getPosts: apiActions.getPosts,
  createPost: apiActions.createPost
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
