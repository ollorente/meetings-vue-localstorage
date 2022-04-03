const TaskModel = require('../task.model')
const { RefInterface } = require('../dto')

module.exports = async (req, res, next) => {
  let result, count
  try {
    result = await TaskModel.find(
      {
        owner: req.user._id,
        isActive: true,
        isLock: false
      },
      {
        name: 1,
        project: 1,
        isActive: 1,
        isLock: 1
      }
    )
      .populate({
        path: 'project',
        select: 'name isActive isLock',
        match: {
          isActive: true,
          isLock: false
        }
      })
      .sort({
        name: 1
      })

    count = await TaskModel.countDocuments({
      owner: req.user._id,
      isActive: true,
      isLock: false
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
