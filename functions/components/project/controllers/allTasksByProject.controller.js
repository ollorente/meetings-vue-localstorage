const ProjectModel = require('../project.model')
const { RefInterface } = require('../../task/dto')

module.exports = async (req, res, next) => {
  const projectData = await ProjectModel.findOne({
    _id: req.params.project
  })
  if (!projectData) {
    return res.status(500).json({
      error: true,
      message: 'Project not found!'
    })
  }

  let result, count
  try {
    result = await ProjectModel.findById(projectData._id, {
      _tasks: 1
    }).populate([
      {
        path: '_tasks',
        select: 'name project isActive isLock',
        options: {
          limit: 100,
          skip: 0,
          sort: {
            name: 1
          }
        },
        match: {
          isActive: true
        },
        populate: {
          path: 'project',
          select: 'name',
          match: {
            isActive: true,
            isLock: false
          }
        }
      }
    ])

    count = await projectData._tasksCount

    res.status(200).json({
      error: false,
      data: result._tasks.length > 0
        ? result._tasks.map((e) => RefInterface(e))
        : [],
      count
    })
  } catch (error) {
    next(error)
  }
}
