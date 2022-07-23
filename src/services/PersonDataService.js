// @ts-check
import { FETCH } from './http-common.js'

class PersonDataService {
  /**
   * @param {any} data
   */
  async create (data) {
    // @ts-ignore
    return await FETCH({
      query: `mutation CreatePerson($input: CreatePersonInput!) {
        personCreate(input: $input) {
          id
          name
          email
          phone
          image
          gravatar
          role
          owner {
            id
            name
            username
            image
            gravatar
          }
          isActive
          createdAt {
            _
          }
          updatedAt {
            _
          }
          projectsCount
          meetingsCount
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
  async getAll (data) {
    // @ts-ignore
    return await FETCH({
      query: `query GetPeople($options: Options) {
        people(options: $options) {
          id
          name
          email
          phone
          image
          gravatar
          role
          owner {
            id
            name
            username
            image
            gravatar
          }
          isActive
          createdAt {
            _
          }
          updatedAt {
            _
          }
          projectsCount
          meetingsCount
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
  async get (id) {
    // @ts-ignore
    return await FETCH({
      query: `query GetPerson($id: ID!) {
        person(id: $id) {
          id
          name
          email
          phone
          image
          gravatar
          role
          owner {
            id
            name
            username
            image
            gravatar
          }
          isActive
          createdAt {
            _
          }
          updatedAt {
            _
          }
          projectsCount
          meetingsCount
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
  async remove (id) {
    // @ts-ignore
    return await FETCH({
      query: `mutation RemovePerson($id: ID!) {
        personRemove(id: $id)
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
  async update (id, data) {
    // @ts-ignore
    return await FETCH({
      query: `mutation UpdatePerson($id: ID!, $input: UpdatePersonInput!) {
        personUpdate(id: $id, input: $input) {
          id
          name
          email
          phone
          image
          gravatar
          role
          owner {
            id
            name
            username
            image
            gravatar
          }
          isActive
          createdAt {
            _
          }
          updatedAt {
            _
          }
          projectsCount
          meetingsCount
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
   * @param {{ limit: number; page: number; }} data
   */
  async byName (input, data) {
    // @ts-ignore
    return await FETCH({
      query: `query PersonByName($input: String!, $options: Options) {
        personByName(input: $input, options: $options) {
          id
          name
          email
          phone
          image
          gravatar
          isActive
          createdAt {
            _
          }
          updatedAt {
            _
          }
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

  /**
   * @param {string} id
   * @param {{ limit: number; page: number; }} data
   */
  async projects (id, data) {
    // @ts-ignore
    return await FETCH({
      query: `query PersonProjects($id: ID!, $options: Options) {
        personProjects(id: $id, options: $options) {
          id
          name
          description
          owner {
            id
            name
            username
            image
            gravatar
          }
          isActive
          createdAt {
            _
          }
          updatedAt {
            _
          }
          collaboratorsCount
          meetingsCount
          tasksCount
        }
      }`,
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
  async meetings (id, data) {
    // @ts-ignore
    return await FETCH({
      query: `query PersonMeetings($id: ID!, $options: Options) {
        personMeetings(id: $id, options: $options) {
          id
          name
          description
          project {
            id
            name
          }
          dateEnd {
            _
          }
          dateInt {
            _
          }
          location
          owner {
            id
            name
            username
            image
            gravatar
          }
          isActive
          isLock
          createdAt {
            _
          }
          updatedAt {
            _
          }
          collaboratorsCount
          tasksCount
        }
      }`,
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
      query: `query PersonTasks($id: ID!, $options: Options) {
        personTasks(id: $id, options: $options) {
          id
          name
          description
          priority
          meeting {
            id
            name
          }
          project {
            id
            name
          }
          owner {
            id
            name
            username
            image
            gravatar
          }
          isActive
          isLock
          createdAt {
            _
          }
          updatedAt {
            _
          }
          collaboratorsCount
        }
      }`,
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

export default new PersonDataService()