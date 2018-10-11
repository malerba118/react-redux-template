import * as schemas from './schemas'
import { denormalize } from 'normalizr'
import { createSelector } from 'reselect'

const entitiesSelector = state => state.entities

class EntitySnapshot {

  constructor(state) {
    this.state = state
  }

  getPostsById = (ids) => {
    let selector = createSelector(
        entitiesSelector,
        entities => {
            return denormalize(ids, [schemas.PostSchema], entities)
        }
    )
    return selector(this.state)
  }

}

export default EntitySnapshot
