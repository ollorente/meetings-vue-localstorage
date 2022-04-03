const MeetingModel = require('../meeting.model')
const { RefInterface } = require('../dto')
const paginator = require('../../../helpers/paginator')

module.exports = async (req, res, next) => {
  const P = paginator(req.query.limit, req.query.page)

  let result, count
  try {
    result = await MeetingModel.find(
      {
        owner: req.user._id,
        isActive: true,
        isLock: false
      },
      {
        name: 1,
        dateEnd: 1,
        dateInt: 1,
        isActive: 1,
        isLock: 1
      }
    )
      .limit(P.limit)
      .skip(P.page)
      .sort({
        dateInt: 1
      })

    count = await MeetingModel.countDocuments({
      owner: req.user._id,
      isActive: true,
      isLock: false
    })

    res.status(200).json({
      error: false,
      data: result.length > 0 ? RefInterface(result) : [],
      count
    })
  } catch (error) {
    next(error)
  }
}
