import { handleActions } from 'redux-actions'
import mockApiClient from 'services/mockApiClient'
import { schemas, actions as dbActions } from '../db'
import { actions as queryActions } from '../queries'
import { normalize } from 'normalizr'

// Action types
const ACTION_NAME = 'getMyFavoritePosts'

// Reducer namespace
export const namespace = `api/GET_MY_FAVORITE_POSTS`

// Actions
const action = (options) => {
 return dispatch => {
    return dispatch({
      type: namespace,
      payload: mockApiClient.getMyFavoritePosts()
        .then(data => {
          let normalizedData = normalize(data, [schemas.PostSchema])
          dispatch(
            dbActions.updateEntities(normalizedData.entities)
          )
          dispatch(
            queryActions.setIds({
              entity: 'Post',
              tag: 'my-favorites',
              ids: normalizedData.result
            })
          )
          return normalizedData.result
        })
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
