import { handleActions } from 'redux-actions'
import mockApiClient from 'services/mockApiClient'
import { schemas, actions as dbActions } from '../db'
import { actions as queryActions } from '../queries'
import { normalize } from 'normalizr'

// Action types
const ACTION_NAME = 'unlikePost'

// Reducer namespace
export const namespace = `api/UNLIKE_POST`

// Actions
const action = (postId) => {
 return dispatch => {
    return dispatch({
      type: namespace,
      payload: mockApiClient.unlikePost(postId)
    })
      .then(data => {
        let post = data.value
        let normalizedData = normalize(post, schemas.PostSchema)
        dispatch(
          dbActions.updateEntities(normalizedData.entities)
        )
        dispatch(
          queryActions.removeIds({
            entity: 'Post',
            tag: 'my-favorites',
            ids: [postId]
          })
        )
      })
  }
}


action.PENDING = `${namespace}_PENDING`
action.FULFILLED = `${namespace}_FULFILLED`
action.REJECTED = `${namespace}_REJECTED`

export const actions = {
  [ACTION_NAME]: action
}


// Reducer
let initialState = {
  pending: false,
  fulfilled: false,
  rejected: false,
  data: null,
  error: null,
}

export const reducer = handleActions(
  {
    [action.PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        fulfilled: false,
        rejected: false,
      }
    },
    [action.FULFILLED]: (state, action) => {
      return {
        ...state,
        data: action.payload,
        error: null,
        pending: false,
        fulfilled: true,
      }
    },
    [action.REJECTED]: (state, action) => {
      return {
        ...state,
        error: action.payload,
        pending: false,
        rejected: true,
      }
    },
  },
  initialState
)

// Selectors
export const selectors = {
  [`${ACTION_NAME}Data`]: (state) => (state[namespace].data),
  [`${ACTION_NAME}Pending`]: (state) => (state[namespace].pending),
  [`${ACTION_NAME}Fulfilled`]: (state) => (state[namespace].fulfilled),
  [`${ACTION_NAME}Rejected`]: (state)  => (state[namespace].rejected),
}
