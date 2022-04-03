module.exports.Interface = (db) => {
  const ProjectRefInterface = require('../project/dto')
  const MeetingRefInterface = require('../meeting/dto')
  const TaskRefInterface = require('../task/dto')

  return {
    id: String(db._id),
    name: String(db.name),
    email: String(db.email),
    role: String(db.role),
    phone: String(db.phone),
    photoURL: String(db.photoURL),
    projects: db._projects.map((e) => ProjectRefInterface.RefInterface(e)),
    projectsCount: Number(db._projectsCount),
    meetings: db._meetings.map((e) => MeetingRefInterface.RefInterface(e)),
    meetingsCount: Number(db._meetingsCount),
    tasks: db._tasks.map((e) => TaskRefInterface.RefInterface(e)),
    tasksCount: Number(db._tasksCount),
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
    email: String(db.email),
    photoURL: String(db.photoURL),
    isActive: Boolean(db.isActive),
    isLock: Boolean(db.isLock)
  }
}
