import * as getPostsDuck from './getPosts'
import * as createPostDuck from './createPost'
import * as logInDuck from './logIn'

/*
*  The api module maintains async action info such as promise
*  state, data, and errors. Api results can also be used to query
*  the db module in cases where it makes sense.
*/

let ducks = [
  getPostsDuck,
  createPostDuck,
  logInDuck,
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
