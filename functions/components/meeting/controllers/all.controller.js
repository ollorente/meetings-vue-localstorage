const MeetingModel = require('../meeting.model')
const { RefInterface } = require('../dto')

module.exports = async (req, res, next) => {
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
    ).sort({
      dateInt: 1
    })

    count = await MeetingModel.countDocuments({
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
