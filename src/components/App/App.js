import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  actions as apiActions,
  selectors as apiSelectors
} from 'store/api'
import { EntitySnapshot } from 'store/db'
import { selectors as querySelectors } from 'store/queries'

import styles from './App.module.scss'; // Import css modules stylesheet as styles


class App extends Component {

  componentDidMount() {
    this.props.getPosts()
    setTimeout(() => {
      this.props.createPost({
        id: 999,
        title: 'idk',
        author: {
          id: 2,
          name: 'Austin',
          email: 'frostinmalaria@gmail.com',
        }
      })
    }, 5000)
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
  let entitySnapshot = new EntitySnapshot(state)
  let query = querySelectors.getIds(state, 'Post', 'all')
  return {
    posts: entitySnapshot.getPostsById(query),
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
