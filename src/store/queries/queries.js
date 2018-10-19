import { handleActions, createAction } from 'redux-actions'

let queries = {
  'Post': {
    tags: ['all']
  }
}

// Reducer namespace
export const namespace = `queries`

export const actions = {
  addIds: createAction('ADD_IDS'),
  setIds: createAction('SET_IDS'),
}

let initialState = {
  Post: {
    all: [],
    mine: [],
  }
}

// Reducer
export const reducer = handleActions(
  {
    [actions.addIds]: (state, action) => {
      let payload = action.payload
      let queryEntity = queries[payload.entity]
      if (queryEntity != null) {
        if (queryEntity.tags.includes(payload.tag)) {
          return {
            ...state,
            [payload.entity]: {
              ...state[payload.entity],
              [payload.tag]: [...state[payload.entity][payload.tag], ...payload.ids]
            },
          }
        }
      }
      throw new Error('Entity and/or tag does not exist.')
    },
    [actions.setIds]: (state, action) => {
      let payload = action.payload
      if (!payload.ids instanceof Array) {
        throw new Error('Ids must be an Array.')
      }
      let queryEntity = queries[payload.entity]
      if (queryEntity != null) {
        if (queryEntity.tags.includes(payload.tag)) {
          return {
            ...state,
            [payload.entity]: {
              ...state[payload.entity],
              [payload.tag]: payload.ids
            },
          }
        }
      }
      throw new Error('Entity and/or tag does not exist.')
    },
  },
  initialState
)

export const selectors = {
  getIds: (state, entity, tag) => state[namespace][entity][tag],
}
