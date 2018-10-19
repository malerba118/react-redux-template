import { handleActions } from 'redux-actions'
import { createAsyncAction } from 'redux-promise-middleware-actions'
import mockApiClient from 'services/mockApiClient'
import { schemas, actions as dbActions } from '../db'
import { actions as queryActions } from '../queries'
import { normalize } from 'normalizr'
import { actions as apiActions } from '../api'

// Reducer namespace
export const namespace = `session`

export const actions = {

}

// Reducer
let initialState = null

export const reducer = handleActions(
  {
    [apiActions.logIn.FULFILLED]: (state, action) => {
      return {
        token: action.payload.token,
        user: action.payload.user,
      }
    },
    [apiActions.logOut.FULFILLED]: (state, action) => {
      return null
    },
  },
  initialState
)

// Selectors
export const selectors = {
  getSession: (state) => (state[namespace]),
}
