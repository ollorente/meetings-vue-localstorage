const TaskModel = require('../task.model')
const { Interface } = require('../dto')

module.exports = async (req, res, next) => {
  let result
  try {
    result = await TaskModel.findOne(
      {
        _id: req.params.task
      },
      {
        owner: 0
      }
    ).populate([
      {
        path: 'project',
        select: 'name isActive isLock',
        match: {
          isActive: true,
          isLock: false
        }
      },
      {
        path: 'meeting',
        select: 'name dateInt dateEnd isActive isLock',
        match: {
          isActive: true,
          isLock: false
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
