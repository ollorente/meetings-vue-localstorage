import http from '../http-common'

class TaskDataService {
  create(data) {
    return http.post(`/tasks`, data)
  }

  get(task) {
    return http.get(`/tasks/${task}`)
  }

  list(l, p) {
    const limit = l ?? 10
    const page = p ?? 1

    return http.get(`/tasks?limit=${limit}&page=${page}`)
  }

  remove(task) {
    return http.delete(`/tasks/${task}`)
  }

  update(task, data) {
    return http.put(`/tasks/${task}`, data)
  }

  people(task, l, p) {
    const limit = l ?? 10
    const page = p ?? 1

    return http.get(`/tasks/${task}/people?limit=${limit}&page=${page}`)
  }

  peopleByText(task, text, l, p) {
    const limit = l ?? 10
    const page = p ?? 1

    return http.get(`/tasks/${task}/people?text=${text}&limit=${limit}&page=${page}`)
  }

  tasksByText(text, l, p) {
    const limit = l ?? 10
    const page = p ?? 1

    return http.get(`/tasks?text=${text}&limit=${limit}&page=${page}`)
  }
}

export default new TaskDataService