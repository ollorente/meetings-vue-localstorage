const UserModel = require('../user.model')
const { RefInterface } = require('../dto')

module.exports = async (req, res, next) => {
  let result, count
  try {
    result = await UserModel.find({
      isActive: true,
      isLock: false
    }).sort({
      name: 1
    })

    count = await UserModel.countDocuments({
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
