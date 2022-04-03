const ProjectModel = require('../../project/project.model')
const { RefInterface } = require('../../project/dto')

module.exports = async (req, res, next) => {
  let result, count
  try {
    result = await ProjectModel.find(
      {
        owner: req.user._id
      }
    )
      .limit(100)
      .skip(0)
      .sort({
        name: 1
      })

    count = await ProjectModel.countDocuments({
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
