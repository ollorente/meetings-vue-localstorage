const ProjectModel = require('../project.model')
const { RefInterface } = require('../dto')
const paginator = require('../../../helpers/paginator')

module.exports = async (req, res, next) => {
  const P = paginator(req.query.limit, req.query.page)

  let result, count
  try {
    result = await ProjectModel.find(
      {
        owner: req.user._id,
        isActive: true
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
      .limit(P.limit)
      .skip(P.page)
      .sort({
        name: 1
      })

    count = await ProjectModel.countDocuments({
      owner: req.user._id,
      isActive: true
    })

    res.status(200).json({
      error: false,
      data: result.length > 0
        ? result.map((e) => RefInterface(result))
        : [],
      count
    })
  } catch (error) {
    next(error)
  }
}
