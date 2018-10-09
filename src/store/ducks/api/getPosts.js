import { handleActions } from 'redux-actions'
import { createAsyncAction } from 'redux-promise-middleware-actions'
import mockApiClient from 'services/mockApiClient'

// Reducer namespace
export const namespace = 'posts'

// Action types
const GET_POSTS = `${namespace}/GET`

// Actions
const getPosts = createAsyncAction(GET_POSTS, async () => {
  return mockApiClient.getPosts()
});

export const actions = {
  getPosts
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
      console.log(action.payload)
      return {
        ...state,
        data: action.payload,
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
export const selectors = {
  getPosts: (state) => (state[namespace].data),
  isGetPostsPending: (state) => (state[namespace].pending),
  isGetPostsFulfiilled: (state) => (state[namespace].fulfilled),
  isGetPostsRejected: (state)  => (state[namespace].rejected),
}
