import EntitySnapshot from './dbSelectors'
import * as schemas from './schemas'
import reducer from './reducer'

/*
*  The db module is a dumb data store, it does not know what to fetch, it just
*  provides an interface to fetch it. It maintains normalized entities.
*/
export {
  EntitySnapshot,
  schemas,
  reducer,
}
