import { handleActions, createAction } from 'redux-actions'
import { createSelector } from 'reselect'

let queries = {
  Post: {
    tags: ['my-favorites']
  }
}

// Reducer namespace
export const namespace = `queries`

export const actions = {
  addIds: createAction('ADD_IDS'),
  setIds: createAction('SET_IDS'),
  removeIds: createAction('REMOVE_IDS'),
}

let initialState = {
  Post: {
    'my-favorites': [],
  }
}

const validatePayload = (payload) => {
  // Right now all actions take same payload so this works, may need
  // to add more parameters to this if action contracts start differing
  if (!payload) {
    return {
      valid: false,
      message: 'Payload must contain entity, tag, and ids'
    }
  }
  if (!payload.ids instanceof Array) {
    return {
      valid: false,
      message: 'Ids must be an Array.'
    }
  }
  let queryEntity = queries[payload.entity]
  if (queryEntity == null || !queryEntity.tags.includes(payload.tag)) {
    return {
      valid: false,
      message: 'Entity and/or tag does not exist.'
    }
  }
  return {
    valid: true,
  }
}

// Reducer
export const reducer = handleActions(
  {
    [actions.addIds]: (state, action) => {
      let validation = validatePayload(action.payload)
      if (validation.valid) {
        let {ids, entity, tag} = action.payload
        return {
          ...state,
          [entity]: {
            ...state[entity],
            [tag]: [...state[entity][tag], ...ids]
          },
        }
      }
      else {
        throw new Error(validation.message)
      }
    },
    [actions.setIds]: (state, action) => {
      let validation = validatePayload(action.payload)
      if (validation.valid) {
        let {ids, entity, tag} = action.payload
        return {
          ...state,
          [entity]: {
            ...state[entity],
            [tag]: ids
          },
        }
      }
      else {
        throw new Error(validation.message)
      }
    },
    [actions.removeIds]: (state, action) => {
      let validation = validatePayload(action.payload)
      if (validation.valid) {
        let {ids, entity, tag} = action.payload
        return {
          ...state,
          [entity]: {
            ...state[entity],
            [tag]: state[entity][tag].filter(id => !ids.includes(id))
          },
        }
      }
      else {
        throw new Error(validation.message)
      }
    },
  },
  initialState
)

const getQueries = state => state[namespace]

export const selectors = {
  createIdsSelector: (entity, tag) => {
    let selector = createSelector(
        getQueries,
        queries => {
            return queries[entity][tag]
        }
    )
    return selector
  },
}
