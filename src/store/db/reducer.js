import {mergeWith, isArray} from 'lodash'
import { handleActions } from 'redux-actions'
import * as dbActions from './actions'

const initialState = {
  Post: {},
  User: {},
}

// Reducer
const reducer = handleActions(
  {
    [dbActions.updateEntities]: (state, action) => {
      return mergeWith({}, state, action.payload, function (objValue, srcValue) {
        if (isArray(objValue)) {
          return srcValue
        }
      })
    },
  },
  initialState
)

export default reducer
