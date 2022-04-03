const ProjectModel = require('../project.model')
const { Interface } = require('../dto')

module.exports = async (req, res, next) => {
  let result
  try {
    result = await ProjectModel.findOne(
      {
        _id: req.params.project,
        owner: req.user._id
      },
      {
        owner: 0
      }
    ).populate([
      {
        path: '_collaborators',
        select: 'name email photoURL isActive isLock',
        options: {
          limit: 10,
          sort: {
            name: 1
          }
        },
        match: {
          isActive: true,
          isLock: false
        }

      },
      {
        path: '_meetings',
        select: 'name dateInt dateEnd isActive isLock',
        options: {
          limit: 10,
          sort: {
            dateInt: 1
          }
        },
        match: {
          isActive: true,
          isLock: false
        }
      },
      {
        path: '_tasks',
        select: 'name project isActive isLock',
        options: {
          limit: 10,
          sort: {
            name: 1
          }
        },
        match: {
          isActive: true,
          isLock: false
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

    res.status(200).json({
      error: false,
      data: result ? Interface(result) : null
    })
  } catch (error) {
    next(error)
  }
}
