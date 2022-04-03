const MeetingModel = require('../meeting.model')
const PersonModel = require('../../person/person.model')
const UserModel = require('../../user/user.model')
const { Interface } = require('../dto')

module.exports = async (req, res, next) => {
  const { meeting } = req.params

  const userData = await UserModel.findOne({
    _id: req.user._id,
    isActive: true,
    isLock: false
  })
  if (!userData) {
    return res.status(400).json({
      error: true,
      message: 'Access denied'
    })
  }

  const meetingData = await MeetingModel.findOne({
    _id: meeting
  })
  if (!meetingData) {
    return res.status(500).json({
      error: true,
      message: 'Meeting not found!'
    })
  }

  let result
  try {
    if (userData._id.toString() === meetingData.owner.toString()) {
      let collaborators = []
      let collaboratorsCount = 0

      // ------- Upload collaborators to meeting -------
      await req.body.collaborators.forEach((e) => {
        collaborators.push(e)
        collaboratorsCount++
      })

      req.body._collaborators = collaborators
      req.body._collaboratorsCount = collaboratorsCount
      // ---X--- Upload collaborators to meeting ---X---

      // ------- Updating meeting -------
      result = await MeetingModel.findOneAndUpdate(
        {
          _id: meetingData._id
        },
        {
          $set: req.body
        },
        {
          new: true
        }
      )
      // ---X--- Updating meeting ---X---

      // ------- Remove meeting to people -------
      const oldPeople = await meetingData._collaborators

      for (let i = 0; i < oldPeople.length; i++) {
        await PersonModel.findOneAndUpdate(
          {
            _id: oldPeople[i]
          },
          {
            $pull: {
              _meetings: meetingData._id
            },
            $inc: {
              _meetingsCount: -1
            }
          }
        )
      }
      // ---X--- Remove meeting to people ---X---

      // ------- Add project to person -------
      const newPeople = await req.body._collaborators

      for (let i = 0; i < newPeople.length; i++) {
        await PersonModel.findOneAndUpdate(
          {
            _id: newPeople[i]
          },
          {
            $push: {
              _meetings: meetingData._id
            },
            $inc: {
              _meetingsCount: 1
            }
          }
        )
      }
      // ---X--- Add project to person ---X---

      res.status(200).json({
        error: false,
        data: Interface(result)
      })
    } else {
      res.status(400).json({
        error: true,
        message: 'Access denied'
      })
    }
  } catch (error) {
    next(error)
  }
}
