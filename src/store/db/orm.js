import { ORM } from 'redux-orm'
import { Post, User } from './models'

const orm = new ORM()
orm.register(User, Post)

export default orm
