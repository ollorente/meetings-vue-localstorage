const MeetingModel = require('../meeting.model')
const PersonModel = require('../../person/person.model')
const ProjectModel = require('../../project/project.model')
const TaskModel = require('../../task/task.model')
const UserModel = require('../../user/user.model')

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
      // ------- Remove meeting of people -------
      const peopleData = await meetingData._collaborators

      for (let i = 0; i < peopleData.length; i++) {
        await PersonModel.findOneAndUpdate(
          {
            _id: peopleData[i]
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
      // ---X--- Remove meeting of people ---X---

      // ------- Remove meeting of user -------
      await UserModel.findOneAndUpdate(
        {
          _id: userData._id
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
      // ---X--- Remove meeting of user ---X---

      // ------- Remove meeting of project -------
      await ProjectModel.findOneAndUpdate(
        {
          _id: meetingData.project
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
      // ---X--- Remove meeting of project ---X---

      // ------- Remove tasks of project -------
      const tasksData = await meetingData._tasks

      for (let i = 0; i < tasksData.length; i++) {
        const tasksInfo = await TaskModel.findOne({
          _id: tasksData[i]
        })

        await UserModel.findOneAndUpdate(
          {
            _id: tasksInfo.owner
          },
          {
            $pull: {
              _tasks: tasksInfo._id
            },
            $inc: {
              _tasksCount: -1
            }
          }
        )

        // ------- Remove tasks of people -------
        const tasksCollaborators = await tasksInfo._collaborators

        for (let i = 0; i < tasksCollaborators.length; i++) {
          await PersonModel.findOneAndUpdate(
            {
              _id: tasksCollaborators[i]
            },
            {
              $pull: {
                _tasks: tasksInfo._id
              },
              $inc: {
                _tasksCount: -1
              }
            }
          )
        }
        // ---X--- Remove tasks of people ---X---

        // ------- Remove task of project -------
        await ProjectModel.findOneAndUpdate(
          {
            _id: meetingData.project
          },
          {
            $pull: {
              _tasks: tasksInfo._id
            },
            $inc: {
              _tasksCount: -1
            }
          }
        )
        // ---X--- Remove task of project ---X---

        await TaskModel.remove({
          _id: tasksInfo._id
        })
      }
      // ---X--- Remove tasks of project ---X---

      result = await MeetingModel.remove({
        _id: meetingData._id
      })

      res.status(200).json({
        error: false,
        data: result
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
