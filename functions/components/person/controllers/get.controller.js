const PersonModel = require('../person.model')
const { Interface } = require('../dto')

module.exports = async (req, res, next) => {
  let result
  try {
    result = await PersonModel.findOne(
      {
        _id: req.params.person,
        owner: req.user._id
      },
      {
        owner: 0
      }
    ).populate([
      {
        path: '_meetings',
        select: 'name dateInt dateEnd isActive isLock',
        options: {
          limit: 5,
          sort: {
            createdAt: -1
          }
        },
        match: {
          isActive: true,
          isLock: false
        }
      },
      {
        path: '_projects',
        select: 'name _tasksCount isActive isLock',
        options: {
          limit: 5,
          sort: {
            createdAt: -1
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
          limit: 5,
          sort: {
            createdAt: -1
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
      data: Interface(result)
    })
  } catch (error) {
    next(error)
  }
}
