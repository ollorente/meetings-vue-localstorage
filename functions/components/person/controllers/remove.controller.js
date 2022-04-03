const MeetingModel = require('../../meeting/meeting.model')
const PersonModel = require('../person.model')
const ProjectModel = require('../../project/project.model')
const TaskModel = require('../../task/task.model')
const UserModel = require('../../user/user.model')

module.exports = async (req, res, next) => {
  const { person } = req.params

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

  const personData = await PersonModel.findOne({
    _id: person
  })
  if (!personData) {
    return res.status(500).json({
      error: true,
      message: 'User not found!'
    })
  }

  let result
  try {
    if (userData._id.toString() === personData.owner.toString()) {
      // ------- Remove person to user -------
      await UserModel.findOneAndUpdate(
        {
          _id: userData._id
        },
        {
          $pull: {
            _people: personData._id
          },
          $inc: {
            _peopleCount: -1
          }
        }
      )
      // ---X--- Remove person to user ---X---

      // ------- Remove person to projects -------
      const projectsData = await personData._projects

      for (let i = 0; i < projectsData.length; i++) {
        await ProjectModel.findOneAndUpdate(
          {
            _id: projectsData[i]
          },
          {
            $pull: {
              _collaborators: personData._id
            },
            $inc: {
              _collaboratorsCount: -1
            }
          }
        )
      }
      // ---X--- Remove person to projects ---X---

      // ------- Remove person to meetings -------
      const meetingsData = await personData._meetings

      for (let i = 0; i < meetingsData.length; i++) {
        await MeetingModel.findOneAndUpdate(
          {
            _id: meetingsData[i]
          },
          {
            $pull: {
              _collaborators: personData._id
            },
            $inc: {
              _collaboratorsCount: -1
            }
          }
        )
      }
      // ---X--- Remove person to meetings ---X---

      // ------- Remove person to tasks -------
      const tasksData = await personData._tasks

      for (let i = 0; i < tasksData.length; i++) {
        await TaskModel.findOneAndUpdate(
          {
            _id: tasksData[i]
          },
          {
            $pull: {
              _collaborators: personData._id
            },
            $inc: {
              _collaboratorsCount: -1
            }
          }
        )
      }
      // ---X--- Remove person to tasks ---X---

      result = await PersonModel.remove({
        _id: personData._id
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
