// selectors.js
import { createSelector } from 'redux-orm';
import orm from './orm';

const dbStateSelector = state => state.db;

class DB {

  constructor(state) {
    this.state = state
  }

  getPosts = () => {
    let selector = createSelector(
        orm,
        dbStateSelector,
        session => {
            return session.Post.all().toRefArray()
        }
    )
    return selector(this.state)
  }
}

export default DB
