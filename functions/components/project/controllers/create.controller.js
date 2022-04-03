const PersonModel = require('../../person/person.model')
const ProjectModel = require('../project.model')
const UserModel = require('../../user/user.model')

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

  let result
  try {
    let collaborators = []
    let collaboratorsCount = 0

    await req.body.collaborators.forEach((e) => {
      collaborators.push(e)
      collaboratorsCount++
    })

    const newData = new ProjectModel({
      name: req.body.name.trim(),
      description: req.body.description.trim(),
      _collaborators: collaborators,
      _collaboratorsCount: collaboratorsCount,
      owner: userData._id
    })

    result = await newData.save()

    // ------- Add project to user -------
    await UserModel.findOneAndUpdate(
      {
        _id: userData._id
      },
      {
        $push: {
          _projects: result._id
        },
        $inc: {
          _projectsCount: 1
        }
      }
    )
    // ---X--- Add project to user ---X---

    // ------- Add project to person -------
    const people = await result._collaborators

    for (let i = 0; i < people.length; i++) {
      await PersonModel.findOneAndUpdate(
        {
          _id: people[i]
        },
        {
          $push: {
            _projects: result._id
          },
          $inc: {
            _projectsCount: 1
          }
        }
      )
    }
    // ---X--- Add project to person ---X---

    res.status(201).json({
      error: false,
      data: result
    })
  } catch (error) {
    next(error)
  }
}
