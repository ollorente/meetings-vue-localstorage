const MeetingModel = require('../meeting.model')
const { Interface } = require('../dto')

module.exports = async (req, res, next) => {
  let result
  try {
    result = await MeetingModel.findOne(
      {
        _id: req.params.meeting
      },
      {
        owner: 0
      }
    ).populate([
      {
        path: 'project',
        select: 'name isActive isLock',
        match: {
          isActive: true,
          isLock: false
        }
      },
      {
        path: '_tasks',
        select: 'name project isActive isLock',
        options: {
          limit: 10,
          sort: {
            name: 1
          }
        },
        match: {
          isActive: true,
          isLock: false
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

    res.status(200).json({
      error: false,
      data: result ? Interface(result) : null
    })
  } catch (error) {
    next(error)
  }
}
