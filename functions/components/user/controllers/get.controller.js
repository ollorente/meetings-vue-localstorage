const UserModel = require('../user.model')
const { Interface } = require('../dto')

module.exports = async (req, res, next) => {
  let result
  try {
    result = await UserModel.findOne(
      {
        _id: req.params.user
      }
    )
      .populate([
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
          path: '_people',
          select: 'name photoURL email isActive isLock',
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
          select: 'name _collaboratorsCount _meetingsCount _tasksCount isActive isLock',
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
