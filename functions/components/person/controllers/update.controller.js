const PersonModel = require('../person.model')
const UserModel = require('../../user/user.model')
const { Interface } = require('../dto')

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
      result = await PersonModel.findOneAndUpdate(
        {
          _id: personData._id
        },
        {
          $set: req.body
        },
        {
          new: true
        }
      )

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
