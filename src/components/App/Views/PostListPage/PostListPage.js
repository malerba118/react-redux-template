import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  actions as apiActions,
  selectors as apiSelectors
} from 'store/api'
import { selectors as sessionSelectors } from 'store/other/session'
import classNames from 'classnames'
import queryString from 'query-string'
import { Grid } from '@material-ui/core'
import { Loading } from 'components/Universal'
import { FlatButton, PostCard } from 'components/App/Shared'
import range from 'lodash/range'
import { BounceLoader } from 'react-spinners'
import { FadeIn } from 'components/Universal/Transitions'
import styles from './PostListPage.module.css'

class PostListPage extends Component {

  componentDidMount() {
    this.getPosts()
  }

  getPosts = () => {
    this.props.getPosts(
      this.getQueryParams(this.props)
    )
  }

  componentDidUpdate(prevProps) {
    let prev = this.getQueryParams(prevProps)
    let curr = this.getQueryParams(this.props)
    if (
      prev.page !== curr.page ||
      prev.perPage !== curr.perPage
    ) {
      this.getPosts()
    }
  }

  getQueryParams = (props) => {
    // Provide defaults if query params don't exist
    let {
      page = 0,
      perPage = 6,
      ...other
    } = queryString.parse(props.location.search)
    return {
      page: Number(page),
      perPage: Number(perPage),
      ...other
    }
  }

  setPage = (page) => {
    let queryParams = this.getQueryParams(this.props)
    queryParams.page = page
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: queryString.stringify(queryParams),
    })
  }

  render() {
    let pageLoading = this.props.getPostsPending || this.props.postsPage.posts == null
    return (
      <Loading loading={pageLoading} minTime={1000}>
        {ready => {
          if (!ready) {
            return (
              <div className={styles.pageLoading}>
                <BounceLoader />
              </div>
            )
          }
          return (
            <FadeIn>
              <Grid container className={styles.pageContainer}>
                  {this.props.postsPage.posts.map((post) => (
                    <Grid
                      key={post.id}
                      className={styles.gridItem}
                      item
                      xs={12}
                      sm={6}
                      lg={4}
                    >
                      <PostCard post={post} liked={post.likes.includes(this.props.session.user.id)}/>
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <div className={styles.pagination}>
                      {range(this.props.postsPage.numPages).map((i) => (
                        <FlatButton
                          key={i}
                          onClick={() => this.setPage(i)}
                          className={classNames(
                            styles.paginationButton,
                            i === this.props.postsPage.page ? styles.paginationButtonActive : ''
                          )}
                        >
                          {i + 1}
                        </FlatButton>
                      ))}
                    </div>
                  </Grid>
              </Grid>
            </FadeIn>
          )
        }}
      </Loading>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    postsPage: apiSelectors.getPostsData(state),
    getPostsPending: apiSelectors.getPostsPending(state),
    session: sessionSelectors.getSession(state)
  }
}

const mapDispatchToProps = {
  getPosts: apiActions.getPosts,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListPage)
