import { handleActions } from 'redux-actions'
import { createAsyncAction } from 'redux-promise-middleware-actions'
import mockApiClient from 'services/mockApiClient'
import { schemas } from '../db'
import { normalize } from 'normalizr'

// Action types
const LOG_IN = `api/LOG_IN`

// Reducer namespace
export const namespace = LOG_IN

// Actions
const logIn = createAsyncAction(
  //action name
  LOG_IN,
  //payload
  async (email, password) => {
    let session = await mockApiClient.logIn(email, password)
    return session
  },
  //meta data
  () => ({isNormalized: false})
);

export const actions = {
  logIn
}


let initialState = {
  pending: false,
  fulfilled: false,
  rejected: false,
  data: null,
  error: null,
}

// Reducer
export const reducer = handleActions(
  {
    [String(getPosts.pending)]: (state, action) => {
      return {
        ...state,
        pending: true,
        fulfilled: false,
        rejected: false,
      }
    },
    [String(getPosts.fulfilled)]: (state, action) => {
      console.log(action)
      return {
        ...state,
        data: action.meta.isNormalized ? action.payload.result : action.payload,
        error: null,
        pending: false,
        fulfilled: true,
      }
    },
    [String(getPosts.rejected)]: (state, action) => {
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
let selectorPrefix = 'logIn'
export const selectors = {
  [`${selectorPrefix}Data`]: (state) => (state[namespace].data),
  [`${selectorPrefix}Pending`]: (state) => (state[namespace].pending),
  [`${selectorPrefix}Fulfilled`]: (state) => (state[namespace].fulfilled),
  [`${selectorPrefix}Rejected`]: (state)  => (state[namespace].rejected),
}
