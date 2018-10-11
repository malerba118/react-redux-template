import utils from 'services/utils'
import users from './users.json'
import allPosts from './posts.json'
let posts = allPosts.slice(0, 10)

const TIMEOUT_MS = 1000

class MockApiClient {

  constructor (token) {
    this.headers = {}
    if (token) {
      this.setToken(token)
    }
  }

  setToken (token) {
    this.token = token
    this.headers['Authorization'] = `Bearer ${token.token}`
  }

  async logIn ({email, password}) {
    await utils.timeout(TIMEOUT_MS)
    if (email != null && password != null) {
      this.setToken('12345')
    }
  }

  async getPosts () {
    await utils.timeout(TIMEOUT_MS)
    return posts
  }

  async createPost ( {id, title, author} = {} ) {
    await utils.timeout(TIMEOUT_MS)
    let newPost = {id, title, author}
    posts.push(newPost)
    return newPost
  }

  async logOut () {
    delete this.token
    delete this.headers.Authorization
  }

}

// Export Singleton
const mockApiClient = new MockApiClient(window.localStorage.getItem('token'))

export default mockApiClient
