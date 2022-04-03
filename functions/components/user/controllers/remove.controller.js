const MeetingModel = require('../../meeting/meeting.model')
const PersonModel = require('../../person/person.model')
const ProjectModel = require('../../project/project.model')
const TaskModel = require('../../task/task.model')
const UserModel = require('../user.model')

module.exports = async (req, res, next) => {
  const { user } = req.params
  const userId = req.user._id

  let result
  try {
    if (userId === user) {
      // ------- Delete people of user -------
      await PersonModel.deleteMany({
        owner: userId
      })
      // ---X--- Delete people of user ---X---

      // ------- Delete projects of user -------
      await ProjectModel.deleteMany({
        owner: userId
      })
      // ---X--- Delete projects of user ---X---

      // ------- Delete meetings of user -------
      await MeetingModel.deleteMany({
        owner: userId
      })
      // ---X--- Delete meetings of user ---X---

      // ------- Delete tasks of user -------
      await TaskModel.deleteMany({
        owner: userId
      })
      // ---X--- Delete tasks of user ---X---

      result = await UserModel.deleteOne({
        _id: userId
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
