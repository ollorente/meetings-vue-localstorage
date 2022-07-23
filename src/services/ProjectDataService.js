// @ts-chec
import { FETCH } from './http-common.js'

class ProjectDataService {
  /**
   * @param {any} data
   */
  async create (data) {
    // @ts-ignore
    return await FETCH({
      query: '',
      variables: {
        input: data
      }
    })
  }

  /**
   * @param {{ limit: number; page: number; }} data
   */
  async getAll (data) {
    // @ts-ignore
    return await FETCH({
      query: ``,
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
  async get (id) {
    // @ts-ignore
    return await FETCH({
      query: '',
      variables: {
        id: id
      }
    })
  }

  /**
   * @param {string} id
   */
  async remove (id) {
    // @ts-ignore
    return await FETCH({
      query: '',
      variables: {
        id: id
      }
    })
  }

  /**
   * @param {string} id
   * @param {any} data
   */
  async update (id, data) {
    // @ts-ignore
    return await FETCH({
      query: '',
      variables: {
        id: id,
        input: data
      }
    })
  }

  /**
   * @param {string} input
   * @param {{ limit: number; page: number; }} data
   */
  async byName (input, data) {
    // @ts-ignore
    return await FETCH({
      query: ``,
      variables: {
        input: input,
        options: {
          limit: data.limit,
          page: data.page
        }
      }
    })
  }

  /**
   * @param {string} id
   * @param {{limit: number;page: number;}} data
   */
  async collaborators (id, data) {
    // @ts-ignore
    return await FETCH({
      query: ``,
      variables: {
        id:id,
        options: {
          limit: data.limit,
          page: data.page
        }
      }
    })
  }

  /**
   * @param {string} id
   * @param {{ limit: number; page: number; }} data
   */
  async meetings (id, data) {
    // @ts-ignore
    return await FETCH({
      query: ``,
      variables: {
        id: id,
        options: {
          limit: data.limit,
          page: data.page
        }
      }
    })
  }

  /**
   * @param {string} id
   * @param {{ limit: number; page: number; }} data
   */
  async tasks (id, data) {
    // @ts-ignore
    return await FETCH({
      query: ``,
      variables: {
        id: id,
        options: {
          limit: data.limit,
          page: data.page
        }
      }
    })
  }
}

export default new ProjectDataService()