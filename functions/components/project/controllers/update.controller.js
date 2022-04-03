const PersonModel = require('../../person/person.model')
const ProjectModel = require('../project.model')
const UserModel = require('../../user/user.model')
const { Interface } = require('../dto')

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
      let collaborators = []
      let collaboratorsCount = 0

      // ------- Upload collaborators to project -------
      await req.body.collaborators.forEach((e) => {
        collaborators.push(e)
        collaboratorsCount++
      })

      req.body._collaborators = collaborators
      req.body._collaboratorsCount = collaboratorsCount
      // ---X--- Upload collaborators to project ---X---

      // ------- Updating project -------
      result = await ProjectModel.findOneAndUpdate(
        {
          _id: projectData._id
        },
        {
          $set: req.body
        },
        {
          new: true
        }
      )
      // ---X--- Updating project ---X---

      // ------- Remove project to people -------
      const oldPeople = await projectData._collaborators

      for (let i = 0; i < oldPeople.length; i++) {
        await PersonModel.findOneAndUpdate(
          {
            _id: oldPeople[i]
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
      }
      // ---X--- Remove project to people ---X---

      // ------- Add project to person -------
      const newPeople = await req.body._collaborators

      for (let i = 0; i < newPeople.length; i++) {
        await PersonModel.findOneAndUpdate(
          {
            _id: newPeople[i]
          },
          {
            $push: {
              _projects: projectData._id
            },
            $inc: {
              _projectsCount: 1
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
