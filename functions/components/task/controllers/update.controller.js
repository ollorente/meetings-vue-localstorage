const PersonModel = require('../../person/person.model')
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

  const taskData = await TaskModel.findOne({
    _id: req.params.task
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
      if (req.body.collaborators) {
        let collaborators = []
        let collaboratorsCount = 0

        // ------- Upload collaborators to task -------
        await req.body.collaborators.forEach((e) => {
          collaborators.push(e)
          collaboratorsCount++
        })

        req.body._collaborators = collaborators
        req.body._collaboratorsCount = collaboratorsCount
        // ---X--- Upload collaborators to task ---X---
      }

      // ------- Updating task -------
      result = await TaskModel.findOneAndUpdate(
        {
          _id: taskData._id
        },
        {
          $set: req.body
        },
        {
          new: true
        }
      )
      // ---X--- Updating task ---X---

      if (req.body.collaborators) {
        // ------- Remove task to people -------
        const oldPeople = await taskData._collaborators

        for (let i = 0; i < oldPeople.length; i++) {
          await PersonModel.findOneAndUpdate(
            {
              _id: oldPeople[i]
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
        // ---X--- Remove task to people ---X---

        // ------- Add task to person -------
        const newPeople = await req.body.collaborators

        for (let i = 0; i < newPeople.length; i++) {
          await PersonModel.findOneAndUpdate(
            {
              _id: newPeople[i]
            },
            {
              $push: {
                _tasks: taskData._id
              },
              $inc: {
                _tasksCount: 1
              }
            }
          )
        }
        // ---X--- Add task to person ---X---
      }

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
