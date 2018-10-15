import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  actions as apiActions,
  selectors as apiSelectors
} from 'store/api'
import { EntitySnapshot } from 'store/db'
import { selectors as querySelectors } from 'store/queries'
import { selectors as sessionSelectors } from 'store/other/session'
import { Redirect } from 'react-router-dom'
import { Grid } from '@material-ui/core'

class PostListPage extends Component {

  componentDidMount() {
    this.props.getPosts()
  }


  render() {
    if (this.props.posts == null && !this.props.getPostsRejected) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <Grid container>
          <Grid item xs={12} md={6}>
            <div>Post List</div>
          </Grid>
          <Grid item xs={12} md={6}>
            {this.props.posts.map((post) => (
              <p key={post.id}>
                {post.title} - {post.author && post.author.name}
              </p>
            ))}
          </Grid>
        </Grid>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  let entitySnapshot = new EntitySnapshot(state)
  let query = querySelectors.getIds(state, 'Post', 'all')
  return {
    posts: entitySnapshot.getPostsById(query),
    getPostsRejected: apiSelectors.getPostsRejected(state),
    session: sessionSelectors.getSession(state)
  }
}

const mapDispatchToProps = {
  getPosts: apiActions.getPosts,
  createPost: apiActions.createPost,
  logIn: apiActions.logIn,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListPage)
