import * as schemas from './schemas'
import { denormalize } from 'normalizr'
import { createSelector } from 'reselect'

export const getEntities = state => state.entities

export const createEntitySelector = (entityName, ids) => {
  let schema = Object.values(schemas).find(schema => schema.key === entityName)
  if (!schema) {
    throw new Error('The entityName provided does not exist!')
  }
  let selector = createSelector(
      getEntities,
      entities => {
          return denormalize(ids, [schema], entities)
      }
  )
  return selector
}
