import http from '../http-common'

class UserDataService {
  auth(data) {
    return http.post(`/users/auth`, data)
  }

  create(data) {
    return http.post(`/users`, data)
  }

  get(user) {
    return http.get(`/users/${user}`)
  }

  list(l, p) {
    const limit = l ?? 10
    const page = p ?? 1

    return http.get(`/users?limit=${limit}&page=${page}`)
  }

  remove(user) {
    return http.delete(`/users/${user}`)
  }

  update(user, data) {
    return http.put(`/users/${user}`, data)
  }

  meetings(user, l, p) {
    const limit = l ?? 10
    const page = p ?? 1

    return http.get(`/users/${user}/meetings?limit=${limit}&page=${page}`)
  }

  people(user, l, p) {
    const limit = l ?? 10
    const page = p ?? 1

    return http.get(`/users/${user}/people?limit=${limit}&page=${page}`)
  }

  projects(user, l, p) {
    const limit = l ?? 10
    const page = p ?? 1

    return http.get(`/users/${user}/projects?limit=${limit}&page=${page}`)
  }

  tasks(user, l, p) {
    const limit = l ?? 10
    const page = p ?? 1

    return http.get(`/users/${user}/tasks?limit=${limit}&page=${page}`)
  }

  meetingsByText(user, text, l, p) {
    const limit = l ?? 10
    const page = p ?? 1

    return http.get(`/users/${user}/meetings?text=${text}&limit=${limit}&page=${page}`)
  }

  peopleByText(user, text, l, p) {
    const limit = l ?? 10
    const page = p ?? 1

    return http.get(`/users/${user}/people?text=${text}&limit=${limit}&page=${page}`)
  }

  projectsByText(user, text, l, p) {
    const limit = l ?? 10
    const page = p ?? 1

    return http.get(`/users/${user}/projects?text=${text}&limit=${limit}&page=${page}`)
  }

  tasksByText(user, text, l, p) {
    const limit = l ?? 10
    const page = p ?? 1

    return http.get(`/users/${user}/tasks?text=${text}&limit=${limit}&page=${page}`)
  }
}

export default new UserDataService
