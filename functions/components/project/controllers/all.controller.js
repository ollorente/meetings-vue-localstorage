const ProjectModel = require('../project.model')
const { RefInterface } = require('../dto')

module.exports = async (req, res, next) => {
  let result, count
  try {
    result = await ProjectModel.find(
      {
        owner: req.user._id,
        isActive: true,
        isLock: false
      },
      {
        name: 1,
        _tasks: 1,
        _tasksCount: 1,
        isActive: 1,
        isLock: 1
      }
    )
      .populate({
        path: '_tasks',
        select: '_id',
        match: {
          isActive: true,
          isLock: false
        }
      })
      .sort({
        name: 1
      })

    count = await ProjectModel.countDocuments({
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
