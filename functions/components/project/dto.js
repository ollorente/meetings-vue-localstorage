module.exports.Interface = (db) => {
  const PersonRefInterface = require('../person/dto')
  const MeetingRefInterface = require('../meeting/dto')
  const TaskRefInterface = require('../task/dto')

  return {
    id: String(db._id),
    name: String(db.name),
    description: String(db.description),
    collaborators: db._collaborators.map((e) =>
      PersonRefInterface.RefInterface(e)
    ),
    collaboratorsCount: Number(db._collaboratorsCount),
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
    collaboratorsCount: Number(db._collaboratorsCount),
    meetingsCount: Number(db._meetingsCount),
    tasksCount: Number(db._tasksCount),
    isActive: Boolean(db.isActive),
    isLock: Boolean(db.isLock)
  }
}
