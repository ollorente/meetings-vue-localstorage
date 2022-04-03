const ProjectModel = require('../../project/project.model')
const { RefInterface } = require('../../project/dto')
const paginator = require('../../../helpers/paginator')

module.exports = async (req, res, next) => {
  const P = paginator(req.query.limit, req.query.page)

  let result, count
  try {
    result = await ProjectModel.find(
      {
        owner: req.user._id,
        isActive: true,
        isLock: false
      }
    )
      .limit(P.limit)
      .skip(P.page)
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
