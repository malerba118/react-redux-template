import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import { reducers as queryReducers } from './queries'
import { reducers as apiReducers } from './api'
import { reducer as dbReducer } from './db'

const middleware = [ thunk, promiseMiddleware() ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const rootReducer = combineReducers({
  ...apiReducers,
  ...queryReducers,
  entities: dbReducer
})

const initStore = () => {
  return createStore(
    rootReducer,
    applyMiddleware(...middleware)
  )
}

export default initStore
