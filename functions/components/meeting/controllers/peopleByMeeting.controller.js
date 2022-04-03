const MeetingModel = require('../meeting.model')
const {
  RefInterface
} = require('../../person/dto')
const paginator = require('../../../helpers/paginator')

module.exports = async (req, res, next) => {
  const P = paginator(req.query.limit, req.query.page)

  const meetingData = await MeetingModel.findOne({
    _id: req.params.meeting
  })
  if (!meetingData) {
    return res.status(500).json({
      error: true,
      message: 'Meeting not found!'
    })
  }

  let result, count
  try {
    result = await MeetingModel.findById(meetingData._id, {
      _collaborators: 1
    }).populate([{
      path: '_collaborators',
      select: 'name photoURL email isActive isLock',
      options: {
        limit: P.limit,
        skip: P.page,
        sort: {
          name: 1
        }
      },
      match: {
        isActive: true
      }
    }])

    count = await meetingData._collaboratorsCount

    res.status(200).json({
      error: false,
      data: result._collaborators.length > 0
        ? result._collaborators.map((e) => RefInterface(e))
        : [],
      count
    })
  } catch (error) {
    next(error)
  }
}
