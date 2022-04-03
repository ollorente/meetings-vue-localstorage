import http from '../http-common'

class PersonDataService {
  create(data) {
    return http.post(`/people`, data)
  }

  get(person) {
    return http.get(`/people/${person}`)
  }

  list(l, p) {
    const limit = l ?? 10
    const page = p ?? 1

    return http.get(`/people?limit=${limit}&page=${page}`)
  }

  remove(person) {
    return http.delete(`/people/${person}`)
  }

  update(person, data) {
    return http.put(`/people/${person}`, data)
  }

  meetings(person, l, p) {
    const limit = l ?? 10
    const page = p ?? 1

    return http.get(`/people/${person}/meetings?limit=${limit}&page=${page}`)
  }

  projects(person, l, p) {
    const limit = l ?? 10
    const page = p ?? 1

    return http.get(`/people/${person}/projects?limit=${limit}&page=${page}`)
  }

  tasks(person, l, p) {
    const limit = l ?? 10
    const page = p ?? 1

    return http.get(`/people/${person}/tasks?limit=${limit}&page=${page}`)
  }

  meetingsByText(person, text, l, p) {
    const limit = l ?? 10
    const page = p ?? 1

    return http.get(`/people/${person}/meetings?text=${text}&limit=${limit}&page=${page}`)
  }

  peopleByText(text, l, p) {
    const limit = l ?? 10
    const page = p ?? 1

    return http.get(`/people?text=${text}&limit=${limit}&page=${page}`)
  }

  projectsByText(person, text, l, p) {
    const limit = l ?? 10
    const page = p ?? 1

    return http.get(`/people/${person}/projects?text=${text}&limit=${limit}&page=${page}`)
  }

  tasksByText(person, text, l, p) {
    const limit = l ?? 10
    const page = p ?? 1

    return http.get(`/people/${person}/tasks?text=${text}&limit=${limit}&page=${page}`)
  }
}

export default new PersonDataService