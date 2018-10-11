import { schema } from 'normalizr'

export const UserSchema = new schema.Entity(
  'User',
  {},
  {
    idAttribute: 'id'
  }
)

export const PostSchema = new schema.Entity(
  'Post',
  {
    author: UserSchema
  },
  {
    idAttribute: 'id'
  }
)
