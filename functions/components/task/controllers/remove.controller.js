const MeetingModel = require('../../meeting/meeting.model')
const PersonModel = require('../../person/person.model')
const ProjectModel = require('../../project/project.model')
const TaskModel = require('../task.model')
const UserModel = require('../../user/user.model')

module.exports = async (req, res, next) => {
  const { task } = req.params

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

  const taskData = await TaskModel.findOne({
    _id: task
  })
  if (!taskData) {
    return res.status(500).json({
      error: true,
      message: 'Task not found!'
    })
  }

  let result
  try {
    if (userData._id.toString() === taskData.owner.toString()) {
      // ------- Remove task in meeting -------
      await MeetingModel.findOneAndUpdate(
        {
          _id: taskData.meeting
        },
        {
          $pull: {
            _tasks: taskData._id
          },
          $inc: {
            _tasksCount: -1
          }
        }
      )
      // ---X--- Remove task in meeting ---X---

      // ------- Remove task in project -------
      await ProjectModel.findOneAndUpdate(
        {
          _id: taskData.project
        },
        {
          $pull: {
            _tasks: taskData._id
          },
          $inc: {
            _tasksCount: -1
          }
        }
      )
      // ---X--- Remove task in project ---X---

      // ------- Remove task in people -------
      const people = await taskData._collaborators

      for (let i = 0; i < people.length; i++) {
        await PersonModel.findOneAndUpdate(
          {
            _id: people[i]
          },
          {
            $pull: {
              _tasks: taskData._id
            },
            $inc: {
              _tasksCount: -1
            }
          }
        )
      }
      // ---X--- Remove task in people ---X---

      // ------- Remove task in user -------
      await UserModel.findOneAndUpdate(
        {
          _id: taskData.owner
        },
        {
          $pull: {
            _tasks: taskData._id
          },
          $inc: {
            _tasksCount: -1
          }
        }
      )
      // ---X--- Remove task in user ---X---

      result = await TaskModel.remove({
        _id: taskData._id
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
