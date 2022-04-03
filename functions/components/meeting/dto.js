module.exports.Interface = (db) => {
  const PersonRefInterface = require('../person/dto')
  const TaskRefInterface = require('../task/dto')

  return {
    id: String(db._id),
    name: String(db.name),
    description: String(db.description),
    project: String(db.project),
    dateInt: Date(db.dateInt).toLocaleString('es-CO'),
    dateEnd: Date(db.dateEnd).toLocaleString('es-CO'),
    collaborators: db._collaborators.map((e) =>
      PersonRefInterface.RefInterface(e)
    ),
    collaboratorsCount: Number(db._collaboratorsCount),
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
    dateInt: Date(db.dateInt).toLocaleString('es-CO'),
    dateEnd: Date(db.dateEnd).toLocaleString('es-CO'),
    isActive: Boolean(db.isActive),
    isLock: Boolean(db.isLock)
  }
}
