import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  actions as apiActions,
  selectors as apiSelectors
} from 'store/api'
import { selectors as sessionSelectors } from 'store/other/session'
import { Switch, Route, withRouter } from 'react-router-dom'
import Moment from 'react-moment'
import { Card, CardActionArea, CardContent, CardActions, CardMedia, Button, Grid } from '@material-ui/core'
import EmptyHeartIcon from '@material-ui/icons/FavoriteBorder'
import HeartIcon from '@material-ui/icons/Favorite'
import Image from '../Image'

import styles from './PostCard.module.css'; // Import css modules stylesheet as styles


class PostCard extends Component {

  render() {
    const {post} = this.props
    return (
      <Card elevation={0} square>
        {/*<CardMedia
          style={{
            height: 300,
          }}
          image={post.image}
          title="Blog Post"
        />*/}
        <Image className={styles.cardImage} zoomOnHover src={post.image}/>
        <CardContent>
          <Grid container>
            <Grid item xs={6}>
              <div className={styles.cardTitle}>
                {post.title}
              </div>
              <br/>
              <div className={styles.cardAuthor}>
                {post.author && post.author.name}
              </div>
            </Grid>
            <Grid item xs={6}>
              <br/>
              <br/>
              <div className={styles.cardDate}>
                <Moment fromNow ago>{post.timestamp}</Moment> ago
              </div>
            </Grid>
          </Grid>
        </CardContent>
        <div className={styles.cardContentDivider}></div>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
          <div style={{flex: 1}}></div>
          {this.props.liked && <HeartIcon className={styles.heartIcon} onClick={() => this.props.unlikePost(post.id)}/>}
          {!this.props.liked && <EmptyHeartIcon className={styles.heartIcon} onClick={() => this.props.likePost(post.id)}/>}
        </CardActions>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = {
  likePost: apiActions.likePost,
  unlikePost: apiActions.unlikePost,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostCard)
