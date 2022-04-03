const MeetingModel = require('../meeting.model')
const { RefInterface } = require('../../task/dto')

module.exports = async (req, res, next) => {
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
      _tasks: 1
    }).populate([
      {
        path: '_tasks',
        select: 'name project isActive isLock',
        options: {
          limit: 100,
          skip: 0,
          sort: {
            name: 1
          }
        },
        match: {
          isActive: true
        },
        populate: {
          path: 'project',
          select: 'name',
          match: {
            isActive: true,
            isLock: false
          }
        }
      }
    ])

    count = await meetingData._tasksCount

    res.status(200).json({
      error: false,
      data: result.length > 0
        ? result._tasks.map((e) => RefInterface(e))
        : [],
      count
    })
  } catch (error) {
    next(error)
  }
}
