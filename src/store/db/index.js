import * as selectors from './selectors'
import * as schemas from './schemas'
import reducer from './reducer'
import * as actions from './actions'

/*
*  The db module is a dumb data store, it does not know what to fetch, it just
*  provides an interface to fetch it. It maintains normalized entities.
*/
export {
  selectors,
  schemas,
  reducer,
  actions,
}
