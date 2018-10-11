import * as getPostsDuck from './getPosts'
import * as createPostDuck from './createPost'

let ducks = [
  getPostsDuck,
  createPostDuck
]

export const reducers = ducks.reduce(
  (reducerMap, duck) => {
    reducerMap[duck.namespace] = duck.reducer
    return reducerMap
  },
  {}
)

export const actions = ducks.reduce(
  (actionsMap, duck) => {
    return {...actionsMap, ...duck.actions}
  },
  {}
)

export const selectors = ducks.reduce(
  (selectorsMap, duck) => {
    return {...selectorsMap, ...duck.selectors}
  },
  {}
)
