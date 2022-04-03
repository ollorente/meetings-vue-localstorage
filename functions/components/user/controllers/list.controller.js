const paginator = require('../../../helpers/paginator')
const UserModel = require('../user.model')
const { RefInterface } = require('../dto')

module.exports = async (req, res, next) => {
  const P = paginator(req.query.limit, req.query.page)

  let result, count
  try {
    result = await UserModel.find({
      isActive: true,
      isLock: false
    })
      .limit(P.limit)
      .skip(P.page)
      .sort({
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
