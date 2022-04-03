const TaskModel = require('../task.model')
const { RefInterface } = require('../../person/dto')

module.exports = async (req, res, next) => {
  const taskData = await TaskModel.findOne({
    _id: req.params.task
  })
  if (!taskData) {
    return res.status(500).json({
      error: true,
      message: 'Task not found!'
    })
  }

  let result, count
  try {
    result = await TaskModel.findById(taskData._id, {
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
          isActive: true,
          isLock: false
        }
      }
    ])

    count = await taskData._collaboratorsCount

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
