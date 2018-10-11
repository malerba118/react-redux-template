import * as postIdsDuck from './postIds'

let ducks = [
  postIdsDuck,
]

/* 
*  The queries module maintains what we should be fetching
*  from the db module via the result feild of normalized data.
*/

export const reducers = ducks.reduce(
  (reducerMap, duck) => {
    reducerMap[duck.namespace] = duck.reducer
    return reducerMap
  },
  {}
)

export const selectors = ducks.reduce(
  (selectorsMap, duck) => {
    return {...selectorsMap, ...duck.selectors}
  },
  {}
)
