import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import { createReducer } from 'redux-orm'
import { reducers } from './ducks/api'
import orm from './db/orm'

const db = createReducer(orm);

const middleware = [ thunk, promiseMiddleware() ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const rootReducer = combineReducers({
  ...reducers,
  db
})

const initStore = () => {
  return createStore(
    rootReducer,
    applyMiddleware(...middleware)
  )
}

export default initStore
