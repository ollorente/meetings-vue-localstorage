module.exports.Interface = (db) => {
  const PersonRefInterface = require('../person/dto')
  const MeetingRefInterface = require('../meeting/dto')
  const ProjectRefInterface = require('../project/dto')

  return {
    id: String(db._id),
    name: String(db.name),
    description: String(db.description),
    meeting: MeetingRefInterface.RefInterface(db.meeting),
    project: ProjectRefInterface.RefInterface(db.project),
    collaborators: db._collaborators.map((e) =>
      PersonRefInterface.RefInterface(e)
    ),
    collaboratorsCount: Number(db._collaboratorsCount),
    isActive: Boolean(db.isActive),
    isLock: Boolean(db.isLock),
    createdAt: Date(db.createdAt).toLocaleString('es-CO'),
    updatedAt: Date(db.updatedAt).toLocaleString('es-CO')
  }
}

module.exports.RefInterface = (db) => {
  const ProjectRefInterface = require('../project/dto')

  return {
    id: String(db._id),
    name: String(db.name),
    project: ProjectRefInterface.RefInterface(db.project),
    isActive: Boolean(db.isActive),
    isLock: Boolean(db.isLock),
    createdAt: Date(db.createdAt).toLocaleString('es-CO')
  }
}
