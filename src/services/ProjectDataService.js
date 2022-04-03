import http from '../http-common'

class ProjectDataService {
  create(data) {
    return http.post(`/projects`, data)
  }

  get(project) {
    return http.get(`/projects/${project}`)
  }

  list(l, p) {
    const limit = l ?? 10
    const page = p ?? 1

    return http.get(`/projects?limit=${limit}&page=${page}`)
  }

  remove(project) {
    return http.delete(`/projects/${project}`)
  }

  update(project, data) {
    return http.put(`/projects/${project}`, data)
  }

  meetings(project, l, p) {
    const limit = l ?? 10
    const page = p ?? 1

    return http.get(`/projects/${project}/meetings?limit=${limit}&page=${page}`)
  }

  people(project, l, p) {
    const limit = l ?? 10
    const page = p ?? 1

    return http.get(`/projects/${project}/people?limit=${limit}&page=${page}`)
  }

  tasks(project, l, p) {
    const limit = l ?? 10
    const page = p ?? 1

    return http.get(`/projects/${project}/tasks?limit=${limit}&page=${page}`)
  }

  meetingsByText(project, text, l, p) {
    const limit = l ?? 10
    const page = p ?? 1

    return http.get(`/projects/${project}/meetings?text=${text}&limit=${limit}&page=${page}`)
  }

  peopleByText(project, text, l, p) {
    const limit = l ?? 10
    const page = p ?? 1

    return http.get(`/projects/${project}/people?text=${text}&limit=${limit}&page=${page}`)
  }

  projectsByText(text, l, p) {
    const limit = l ?? 10
    const page = p ?? 1

    return http.get(`/projects?text=${text}&limit=${limit}&page=${page}`)
  }

  tasksByText(project, text, l, p) {
    const limit = l ?? 10
    const page = p ?? 1

    return http.get(`/projects/${project}/tasks?text=${text}&limit=${limit}&page=${page}`)
  }
}

export default new ProjectDataService