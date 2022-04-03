module.exports.Interface = (db) => {
  const PersonRefInterface = require('../person/dto')
  const MeetingRefInterface = require('../meeting/dto')
  const ProjectRefInterface = require('../project/dto')
  const TaskRefInterface = require('../task/dto')

  return {
    id: String(db._id),
    name: String(db.name),
    username: String(db.username),
    photoURL: String(db.photoURL),
    gravatar: String(db.gravatar),
    projects: db._projects.map((e) => ProjectRefInterface.RefInterface(e)),
    projectsCount: Number(db._projectsCount),
    meetings: db._meetings.map((e) => MeetingRefInterface.RefInterface(e)),
    meetingsCount: Number(db._meetingsCount),
    tasks: db._tasks.map((e) => TaskRefInterface.RefInterface(e)),
    tasksCount: Number(db._tasksCount),
    people: db._people.map((e) => PersonRefInterface.RefInterface(e)),
    peopleCount: Number(db._peopleCount),
    isActive: Boolean(db.isActive),
    isLock: Boolean(db.isLock),
    createdAt: Date(db.createdAt).toLocaleString('es-CO'),
    updatedAt: Date(db.updatedAt).toLocaleString('es-CO')
  }
}

module.exports.RefInterface = (db) => {
  return {
    id: String(db._id),
    name: String(db.name),
    username: String(db.username),
    photoURL: String(db.photoURL),
    gravatar: String(db.gravatar),
    isActive: Boolean(db.isActive),
    isLock: Boolean(db.isLock)
  }
}
