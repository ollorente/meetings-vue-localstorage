const ProjectModel = require('../project.model')
const { RefInterface } = require('../../meeting/dto')
const paginator = require('../../../helpers/paginator')

module.exports = async (req, res, next) => {
  const P = paginator(req.query.limit, req.query.page)

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
      _meetings: 1
    }).populate([
      {
        path: '_meetings',
        select: 'name dateInt dateEnd isActive isLock',
        options: {
          limit: P.limit,
          skip: P.page,
          sort: {
            dateInt: 1
          }
        },
        match: {
          isActive: true
        }
      }
    ])

    count = await projectData._meetingsCount

    res.status(200).json({
      error: false,
      data: result._meetings.length > 0
        ? result._meetings.map((e) => RefInterface(e))
        : [],
      count
    })
  } catch (error) {
    next(error)
  }
}
