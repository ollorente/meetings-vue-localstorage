module.exports = {
  UserCreate: require('./create.controller'),
  UserList: require('./list.controller'),
  UserGet: require('./get.controller'),
  UserUpdate: require('./update.controller'),
  UserRemove: require('./remove.controller'),
  UserAuth: require('./auth.controller'),
  UserProjectsByUser: require('./projectsByUser.controller'),
  UserAllProjectsByUser: require('./allProjectsByUser.controller'),
  UserMeetingsByUser: require('./meetingsByUser.controller'),
  UserAllMeetingsByUser: require('./allMeetingsByUser.controller'),
  UserTasksByUser: require('./tasksByUser.controller'),
  UserAllTasksByUser: require('./allTasksByUser.controller'),
  UserPeopleByUser: require('./peopleByUser.controller'),
  UserAllPeopleByUser: require('./allPeopleByUser.controller'),
  UserHome: require('./home.controller'),
  UserAll: require('./all.controller')
}
