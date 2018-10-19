import { rolesEnum } from 'enums/authEnums'

export const isAuthenticated = (session) => {
  return session != null
}

export const isAuthor = (user) => {
  return return user.roles.includes(rolesEnum.AUTHOR)
}

export const isAdmin = (user) => {
  return return user.roles.includes(rolesEnum.AUTHOR)
}
