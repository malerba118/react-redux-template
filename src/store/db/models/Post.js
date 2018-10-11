import {fk, many, attr, Model} from 'redux-orm';
import { actions as apiActions } from 'store/ducks/api'

class Post extends Model {

    static get fields() {
      return {
        id: attr(),
        title: attr(),
        author: fk('User', 'posts'),
      }
    }

    static reducer(action, Post, session) {
        switch (action.type) {
        case String(apiActions.getPosts.fulfilled):
            action.payload.map((post) => {
              Post.create({
                id: post.id,
                title: post.title,
                author: post.author
              })
            })
            break;
        case String(apiActions.createPost.fulfilled):
            Post.create({
              id: action.payload.id,
              title: action.payload.title,
              author: action.payload.author.id
            });
            break;
        }
    }

    toString() {
        return `Post: ${this.title}`;
    }
}

Post.modelName = 'Post'

export default Post;
