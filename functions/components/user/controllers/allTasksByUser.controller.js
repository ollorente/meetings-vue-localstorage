const TaskModel = require('../../task/task.model')
const { RefInterface } = require('../../task/dto')

module.exports = async (req, res, next) => {
  let result, count
  try {
    result = await TaskModel.find(
      {
        owner: req.user._id
      }
    )
      .populate({
        path: 'project',
        select: 'name',
        match: {
          isActive: true,
          isLock: false
        }
      })
      .limit(100)
      .skip(0)
      .sort({
        name: 1
      })

    count = await TaskModel.countDocuments({
      owner: req.user._id
    })

    res.status(200).json({
      error: false,
      data: result.length > 0 ? result.map((e) => RefInterface(e)) : [],
      count
    })
  } catch (error) {
    next(error)
  }
}
