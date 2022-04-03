const MeetingModel = require('../../meeting/meeting.model')
const PersonModel = require('../../person/person.model')
const ProjectModel = require('../project.model')
const TaskModel = require('../../task/task.model')
const UserModel = require('../../user/user.model')

module.exports = async (req, res, next) => {
  const { project } = req.params

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

  const projectData = await ProjectModel.findOne({
    _id: project
  })
  if (!projectData) {
    return res.status(500).json({
      error: true,
      message: 'Project not found!'
    })
  }

  let result
  try {
    if (userData._id.toString() === projectData.owner.toString()) {
      // ------- Remove meetings of project -------
      const meetingsData = await projectData._meetings

      for (let i = 0; i < meetingsData.length; i++) {
        await MeetingModel.remove({
          _id: meetingsData[i]
        })

        await UserModel.findOneAndUpdate(
          {
            _id: projectData.owner
          },
          {
            $pull: {
              _meetings: meetingsData[i]
            },
            $inc: {
              _meetingsCount: -1
            }
          }
        )
      }
      // ---X--- Remove meetings of project ---X---

      // ------- Remove tasks of project -------
      const tasksData = await projectData._tasks

      for (let i = 0; i < tasksData.length; i++) {
        await TaskModel.remove({
          _id: tasksData[i]
        })

        await UserModel.findOneAndUpdate(
          {
            _id: projectData.owner
          },
          {
            $pull: {
              _tasks: tasksData[i]
            },
            $inc: {
              _tasksCount: -1
            }
          }
        )
      }
      // ---X--- Remove tasks of project ---X---

      // ------- Remove project in people -------
      const peopleData = await projectData._collaborators

      for (let i = 0; i < peopleData.length; i++) {
        await PersonModel.findOneAndUpdate(
          {
            _id: peopleData[i]
          },
          {
            $pull: {
              _projects: projectData._id
            },
            $inc: {
              _projectsCount: -1
            }
          }
        )

        await PersonModel.findOneAndUpdate(
          {
            _id: peopleData[i]
          },
          {
            $pull: {
              _meetings: projectData._id
            },
            $inc: {
              _meetingsCount: -1
            }
          }
        )

        await PersonModel.findOneAndUpdate(
          {
            _id: peopleData[i]
          },
          {
            $pull: {
              _tasks: projectData._id
            },
            $inc: {
              _tasksCount: -1
            }
          }
        )
      }
      // ---X--- Remove project in people ---X---

      // ------- Remove project in user -------
      await UserModel.findOneAndUpdate(
        {
          _id: userData._id
        },
        {
          $pull: {
            _projects: projectData._id
          },
          $inc: {
            _projectsCount: -1
          }
        }
      )
      // ---X--- Remove project in user ---X---

      result = await ProjectModel.remove({
        _id: projectData._id
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
