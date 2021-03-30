import { db, dbName } from "@/main";

const state = {
  personMeetings: [],
};

const getters = {
  getPersonMeetings: (state) => state.personMeetings,
  getAllPersonMeetings: (state) => state.personMeetings,
};

const actions = {
  async fetchPersonMeetings({ commit }, data) {
    try {
      const limit = data.limit ? data.limit : 20;
      const page = (data.page - 1) * data.limit || 0;

      const meetings = Object.values(db.peopleMeetings[data.id])
        .filter((e) => e.isLock === false)
        .filter((e) => e.isActive === true)
        .sort(function (a, b) {
          if (a.dateInt > b.dateInt) {
            return 1;
          }
          if (a.dateInt < b.dateInt) {
            return -1;
          }
          return 0;
        })
        .splice(page, limit)
        .map((e) => {
          return {
            id: e.id,
            name: e.name,
            dateInt: e.dateInt,
            dateEnd: e.dateEnd,
            isActive: e.isActive,
            isLock: e.isLock,
          };
        });

      commit("SET_PERSON_MEETINGS", meetings);
    } catch (error) {
      if (error) return;
    }
  },

  async fetchAllPersonMeetings({ commit }, id) {
    try {
      const meetings = Object.values(db.peopleMeetings[id])
        .filter((e) => e.isLock === false)
        .filter((e) => e.isActive === true)
        .sort(function (a, b) {
          if (a.dateInt > b.dateInt) {
            return 1;
          }
          if (a.dateInt < b.dateInt) {
            return -1;
          }
          return 0;
        })
        .map((e) => {
          return {
            id: e.id,
            name: e.name,
            dateInt: e.dateInt,
            dateEnd: e.dateEnd,
            isActive: e.isActive,
            isLock: e.isLock,
          };
        });

      commit("SET_PERSON_MEETINGS", meetings);
    } catch (error) {
      if (error) return;
    }
  },

  async removePersonMeeting({ commit }, id) {
    delete db.peopleMeetings[id];

    localStorage.setItem(dbName, JSON.stringify(db));

    commit("REMOVE_PERSON_MEETING", true);
  },
};

const mutations = {
  SET_PERSON_MEETINGS: (state, meetings) => (state.personMeetings = meetings),
  SET_ALL_PERSON_MEETINGS: (state, meetings) =>
    (state.personMeetings = meetings),
  REMOVE_PERSON_MEETING: (state, meeting) => (state.personMeetings = meeting),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
