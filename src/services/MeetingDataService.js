import http from "../http-common";

class MeetingDataService {
  create(data) {
    return http.post(`/meetings`, data);
  }

  get(meeting) {
    return http.get(`/meetings/${meeting}`);
  }

  list(l, p) {
    const limit = l ?? 10;
    const page = p ?? 1;

    return http.get(`/meetings?limit=${limit}&page=${page}`);
  }

  remove(meeting) {
    return http.delete(`/meetings/${meeting}`);
  }

  update(meeting, data) {
    return http.put(`/meetings/${meeting}`, data);
  }

  people(meeting, l, p) {
    const limit = l ?? 10;
    const page = p ?? 1;

    return http.get(`/meetings/${meeting}/people?limit=${limit}&page=${page}`);
  }

  tasks(meeting, l, p) {
    const limit = l ?? 10;
    const page = p ?? 1;

    return http.get(`/meetings/${meeting}/tasks?limit=${limit}&page=${page}`);
  }

  meetingsByText(text, l, p) {
    const limit = l ?? 10;
    const page = p ?? 1;

    return http.get(`/meetings?text=${text}&limit=${limit}&page=${page}`);
  }

  peopleByText(meeting, text, l, p) {
    const limit = l ?? 10;
    const page = p ?? 1;

    return http.get(
      `/meetings/${meeting}/people?text=${text}&limit=${limit}&page=${page}`
    );
  }

  tasksByText(meeting, text, l, p) {
    const limit = l ?? 10;
    const page = p ?? 1;

    return http.get(
      `/meetings/${meeting}/tasks?text=${text}&limit=${limit}&page=${page}`
    );
  }
}

export default new MeetingDataService();
