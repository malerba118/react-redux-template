import { handleActions, createAction } from 'redux-actions'
import { createAsyncAction } from 'redux-promise-middleware-actions'
import mockApiClient from 'services/mockApiClient'
import { schemas, actions as dbActions } from '../db'
import { actions as queryActions } from '../queries'
import { normalize } from 'normalizr'

// Reducer namespace
export const namespace = `notifications`

export const actions = {
  showNotification: createAction('SHOW_NOTIFICATION'),
  hideNotification: createAction('HIDE_NOTIFICATION')
}

// Reducer
let initialState = []

export const reducer = handleActions(
  {
    [actions.showNotification]: (state, action) => {
      return [...state, action.payload]
    },
    [actions.hideNotification]: (state, action) => {
      return state.filter(notification => notification !== action.payload)
    },
  },
  initialState
)

// Selectors
export const selectors = {
  getMostRecent: (state) => (state[namespace][state[namespace].length - 1]),
}
