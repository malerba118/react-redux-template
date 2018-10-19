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
import PostCard from 'components/App/Shared/PostCard/PostCard'

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
        <Grid container style={{padding: 24}}>
            {this.props.posts.map((post) => (
              <Grid style={{padding: 24}} item xs={12} sm={6} lg={4}>
                <PostCard post={post} />
              </Grid>
            ))}
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
