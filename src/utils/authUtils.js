import { rolesEnum } from 'enums'

export const isAuthenticated = (session) => {
  return session != null
}

export const isAuthor = (user) => {
  return user.roles.includes(rolesEnum.Author)
}

export const isAdmin = (user) => {
  return user.roles.includes(rolesEnum.Admin)
}
