import {mergeWith, isArray} from 'lodash'

const initialState = {
  Post: {},
  User: {},
}

//recursively merge all entities together to update db
const reducer = (state = initialState, action) => {
  if (action.meta && action.meta.isNormalized && action.payload && action.payload.entities) {
    return mergeWith({}, state, action.payload.entities, function (objValue, srcValue) {
      if (isArray(objValue)) {
        return srcValue
      }
    })
  }
  return state
}

export default reducer
