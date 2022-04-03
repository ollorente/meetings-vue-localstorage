const MeetingModel = require('../../meeting/meeting.model')
const PersonModel = require('../../person/person.model')
const ProjectModel = require('../../project/project.model')
const TaskModel = require('../task.model')
const UserModel = require('../../user/user.model')
const { Interface } = require('../dto')

module.exports = async (req, res, next) => {
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
    _id: req.params.meeting
  })
  if (!meetingData) {
    return res.status(500).json({
      error: true,
      message: 'Meeting not found!'
    })
  }

  const projectData = await ProjectModel.findOne({
    _id: meetingData.project
  })
  if (!projectData) {
    return res.status(500).json({
      error: true,
      message: 'Project not found!'
    })
  }

  let result
  try {
    let collaborators = []
    let collaboratorsCount = 0

    await req.body.collaborators.forEach((e) => {
      collaborators.push(e)
      collaboratorsCount++
    })

    const newData = new TaskModel({
      name: await req.body.name.trim(),
      description: await req.body.description.trim(),
      _collaborators: collaborators,
      _collaboratorsCount: collaboratorsCount,
      meeting: await meetingData._id,
      project: await meetingData.project,
      owner: await userData._id
    })

    result = await newData.save()

    // ------- Add task to user -------
    await MeetingModel.findOneAndUpdate(
      {
        _id: meetingData._id
      },
      {
        $push: {
          _tasks: result._id
        },
        $inc: {
          _tasksCount: 1
        }
      }
    )
    // ---X--- Add task to user ---X---

    // ------- Add task to user -------
    await UserModel.findOneAndUpdate(
      {
        _id: userData._id
      },
      {
        $push: {
          _tasks: result._id
        },
        $inc: {
          _tasksCount: 1
        }
      }
    )
    // ---X--- Add task to user ---X---

    // ------- Add task to project -------
    await ProjectModel.findOneAndUpdate(
      {
        _id: projectData._id
      },
      {
        $push: {
          _tasks: result._id
        },
        $inc: {
          _tasksCount: 1
        }
      }
    )
    // ---X--- Add task to project ---X---

    // ------- Add task to person -------
    const people = await result._collaborators

    for (let i = 0; i < people.length; i++) {
      await PersonModel.findOneAndUpdate(
        {
          _id: people[i]
        },
        {
          $push: {
            _tasks: result._id
          },
          $inc: {
            _tasksCount: 1
          }
        }
      )
    }
    // ---X--- Add task to person ---X---

    res.status(201).json({
      error: false,
      data: Interface(result)
    })
  } catch (error) {
    next(error)
  }
}
