import { handleActions } from 'redux-actions'
import {
  actions as apiActions,
  selectors as apiSelectors
} from '../api'

// Reducer namespace
export const namespace = 'postIds'

let initialState = {
  all: [],
  mine: [],
}

// Reducer
export const reducer = handleActions(
  {
    [String(apiActions.createPost.fulfilled)]: (state, action) => {
      return {
        ...state,
        all: [...state.all, action.payload.result],
      }
    },
    [String(apiActions.getPosts.fulfilled)]: (state, action) => {
      return {
        ...state,
        all: [...state.all, ...action.payload.result],
      }
    },
  },
  initialState
)

export const selectors = {
  getAllPostIds: (state) => state[namespace].all,
  getMyPostIds: (state) => state[namespace].mine,
}
