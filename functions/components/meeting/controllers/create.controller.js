const MeetingModel = require('../meeting.model')
const PersonModel = require('../../person/person.model')
const ProjectModel = require('../../project/project.model')
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

  const projectData = await ProjectModel.findOne({
    _id: req.params.project
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

    const newData = new MeetingModel({
      name: await req.body.name.trim(),
      description: await req.body.description.trim(),
      _collaborators: collaborators,
      _collaboratorsCount: collaboratorsCount,
      project: await projectData._id,
      dateInt: await req.body.dateInt,
      dateEnd: await req.body.dateEnd,
      owner: await userData._id
    })

    result = await newData.save()

    // ------- Add meeting to user -------
    await UserModel.findOneAndUpdate(
      {
        _id: userData._id
      },
      {
        $push: {
          _meetings: result._id
        },
        $inc: {
          _meetingsCount: 1
        }
      }
    )
    // ---X--- Add meeting to user ---X---

    // ------- Add meeting to project -------
    await ProjectModel.findOneAndUpdate(
      {
        _id: projectData._id
      },
      {
        $push: {
          _meetings: result._id
        },
        $inc: {
          _meetingsCount: 1
        }
      }
    )
    // ---X--- Add meeting to project ---X---

    // ------- Add meeting to person -------
    const people = await result._collaborators

    for (let i = 0; i < people.length; i++) {
      await PersonModel.findOneAndUpdate(
        {
          _id: people[i]
        },
        {
          $push: {
            _meetings: result._id
          },
          $inc: {
            _meetingsCount: 1
          }
        }
      )
    }
    // ---X--- Add meeting to person ---X---

    res.status(201).json({
      error: false,
      data: Interface(result)
    })
  } catch (error) {
    next(error)
  }
}
