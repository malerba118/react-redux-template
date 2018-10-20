import utils from 'services/utils'
import users from './users.json'
import allPosts from './posts.json'
let posts = allPosts.slice(0, 10)

const TIMEOUT_MS = 100
const token = '12345'
const loggedInUser = users[0]

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

  async logIn (email, password) {
    await utils.timeout(TIMEOUT_MS)
    this.setToken(token)
    return {
      token,
      user: loggedInUser
    }
  }

  async getPosts ({page = 0, perPage = 6} = {}) {
    await utils.timeout(TIMEOUT_MS)
    return {
      page,
      perPage,
      numPages: Math.ceil(posts.length / perPage),
      posts: posts.slice(page * perPage, page * perPage + perPage)
    }
  }

  async getMyFavoritePosts() {
    await utils.timeout(TIMEOUT_MS)
    console.log(posts)
    console.log(loggedInUser.id)
    return posts.filter(post => post.likes.includes(loggedInUser.id))
  }

  async createPost ( {id, title, author} = {} ) {
    await utils.timeout(TIMEOUT_MS)
    let newPost = {id, title, author}
    posts.push(newPost)
    return newPost
  }

  async likePost (id) {
    await utils.timeout(TIMEOUT_MS)
    let post = posts.find((p) => p.id === id)
    if (post) {
      // Normally user would be inferred from auth token
      post.likes = [loggedInUser.id]
    }
    return post
  }

  async unlikePost (id) {
    await utils.timeout(TIMEOUT_MS)
    let post = posts.find((p) => p.id === id)
    if (post) {
      post.likes = []
    }
    return post
  }

  async logOut () {
    await utils.timeout(TIMEOUT_MS)
    delete this.token
    delete this.headers.Authorization
  }

}

// Export Singleton
const mockApiClient = new MockApiClient(window.localStorage.getItem('token'))

export default mockApiClient
