const MeetingModel = require('../../meeting/meeting.model')
const { RefInterface } = require('../../meeting/dto')

module.exports = async (req, res, next) => {
  let result, count
  try {
    result = await MeetingModel.find(
      {
        owner: req.user._id
      }
    )
      .limit(100)
      .skip(0)
      .sort({
        dateInt: 1
      })

    count = await MeetingModel.countDocuments({
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
