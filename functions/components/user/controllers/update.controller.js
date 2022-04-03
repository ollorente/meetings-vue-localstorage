const bcrypt = require('bcryptjs')
const md5 = require('md5')

const UserModel = require('../user.model')
const { Interface } = require('../dto')

module.exports = async (req, res, next) => {
  const { user } = req.params

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

  const personData = await UserModel.findOne({
    _id: user
  })
  if (!personData) {
    return res.status(500).json({
      error: true,
      message: 'User not found!'
    })
  }

  let result
  try {
    if (userData._id.toString() === personData._id.toString()) {
      if (req.body.password) {
        /* Hash password */
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(
          req.body.password,
          salt
        )

        req.body.password = hashedPassword
      }

      if (req.body.email) {
        req.body.gravatar = md5(req.body.email)
      }

      result = await UserModel.findOneAndUpdate(
        {
          _id: user
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
