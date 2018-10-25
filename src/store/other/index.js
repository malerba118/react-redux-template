import * as sessionDuck from './session'
import * as notificationsDuck from './notifications'

/*
*  The api module maintains async action info such as promise
*  state, data, and errors. Api results can also be used to query
*  the db module in cases where it makes sense.
*/

let ducks = [
  sessionDuck,
  notificationsDuck,
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
