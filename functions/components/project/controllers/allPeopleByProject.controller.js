const ProjectModel = require('../project.model')
const { RefInterface } = require('../../person/dto')

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
      _collaborators: 1
    }).populate([
      {
        path: '_collaborators',
        select: 'name photoURL email isActive isLock',
        options: {
          limit: 100,
          skip: 0,
          sort: {
            name: 1
          }
        },
        match: {
          isActive: true
        }
      }
    ])

    count = await projectData._collaboratorsCount

    res.status(200).json({
      error: false,
      data: result._collaborators.length > 0
        ? result._collaborators.map((e) => RefInterface(e))
        : [],
      count
    })
  } catch (error) {
    next(error)
  }
}
