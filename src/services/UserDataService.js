// @ts-check
import { FETCH } from './http-common.js'

class UserDataService {
  /**
   * @param {any} data
   */
  async auth(data) {
    // @ts-ignore
    return await FETCH({
      query: `mutation Auth($username: String!, $password: String!) {
        auth(username: $username, password: $password) {
          token
          user {
            name
            username
            image
            gravatar
            isAdmin
            isSuperuser
          }
        }
      }`,
      variables: {
        password: data.password,
        username: data.username
      }
    })
  }

  async me() {
    // @ts-ignore
    return await FETCH({
      query: `query Me {
        me {
          id
          name
          username
          email
          phone
          image
          gravatar
          isAdmin
          isSuperuser
          isActive
          createdAt {
            _
          }
          updatedAt {
            _
          }
          contacts {
            id
            name
            image
            gravatar
          }
          contactsCount
          meetings {
            id
            name
          }
          meetingsCount
          projects {
            id
            name
          }
          projectsCount
          tasks {
            id
            name
          }
          tasksCount
        }
      }`
    })
  }

  /**
   * @param {any} data
   */
  async create(data) {
    // @ts-ignore
    return await FETCH({
      query: `mutation CreateUser($input: CreateUserInput!) {
        userCreate(input: $input) {
          id
          name
          username
          email
          phone
          image
          gravatar
          isAdmin
          isSuperuser
          isActive
          createdAt {
            _
          }
          updatedAt {
            _
          }
          contactsCount
          meetingsCount
          projectsCount
          tasksCount
        }
      }`,
      variables: {
        input: data
      }
    })
  }

  /**
   * @param {{ limit: number; page: number; }} data
   */
  async getAll(data) {
    // @ts-ignore
    return await FETCH({
      query: `query Users($options: Options) {
        users(options: $options) {
          id
          name
          username
          email
          phone
          image
          gravatar
          isAdmin
          isSuperuser
          isActive
          createdAt {
            _
          }
          updatedAt {
            _
          }
          contactsCount
          meetingsCount
          projectsCount
          tasksCount
        }
      }`,
      variables: {
        options: {
          limit: data.limit,
          page: data.page
        }
      }
    })
  }

  /**
   * @param {string} id
   */
  async get(id) {
    // @ts-ignore
    return await FETCH({
      query: `query User($id: String!) {
        user(id: $id) {
          id
          name
          username
          email
          phone
          image
          gravatar
          isAdmin
          isSuperuser
          isActive
          createdAt {
            _
          }
          updatedAt {
            _
          }
          contacts {
            id
            name
            image
            gravatar
          }
          contactsCount
          meetings {
            id
            name
          }
          meetingsCount
          projects {
            id
            name
          }
          projectsCount
          tasks {
            id
            name
          }
          tasksCount
        }
      }`,
      variables: {
        id: id
      }
    })
  }

  /**
   * @param {string} id
   */
  async remove(id) {
    // @ts-ignore
    return await FETCH({
      query: `mutation RemoveUser($id: String!) {
        userRemove(id: $id)
      }`,
      variables: {
        id: id
      }
    })
  }

  /**
   * @param {string} id
   * @param {any} data
   */
  async update(id, data) {
    // @ts-ignore
    return await FETCH({
      query: `mutation UpdateUser($id: String!, $input: UpdateUserInput!) {
        userUpdate(id: $id, input: $input) {
          id
          name
          username
          email
          phone
          image
          gravatar
          isAdmin
          isSuperuser
          isActive
          createdAt {
            _
          }
          updatedAt {
            _
          }
          contactsCount
          meetingsCount
          projectsCount
          tasksCount
        }
      }`,
      variables: {
        id: id,
        input: data
      }
    })
  }

  /**
   * @param {string} input
   * @param {{limit: number;page: number;}} data
   */
  async byName(input, data) {
    // @ts-ignore
    return await FETCH({
      query: `query UserByName($input: String!, $options: Options) {
        userByName(input: $input, options: $options) {
          id
          name
          username
          email
          phone
          image
          gravatar
          isAdmin
          isSuperuser
          isActive
          createdAt {
            _
          }
          updatedAt {
            _
          }
          contactsCount
          meetingsCount
          projectsCount
          tasksCount
        }
      }`,
      variables: {
        input: input,
        options: {
          limit: data.limit,
          page: data.page
        }
      }
    })
  }
}

export default new UserDataService()
