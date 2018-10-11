import {fk, many, attr, Model} from 'redux-orm';
import { actions as apiActions } from 'store/ducks/api'

class User extends Model {

    static get fields() {
      return {
        id: attr(),
        name: attr(),
        email: attr(),
      }
    }

    static reducer(action, User, session) {
        switch (action.type) {
        case String(apiActions.createPost.fulfilled):
            console.log(action.payload)
            User.upsert(action.payload.author)
            break;
        }
    }

    toString() {
        return `User: ${this.name}`;
    }
}

User.modelName = 'User'

export default User;
