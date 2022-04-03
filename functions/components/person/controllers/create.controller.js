const PersonModel = require('../person.model')
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

  const personData = await PersonModel.findOne({
    owner: userData._id,
    email: req.body.email
  })
  if (personData) {
    return res.status(500).json({
      error: true,
      message: 'Email already exist!'
    })
  }

  let result
  try {
    const newData = new PersonModel({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      owner: userData._id,
      phone: '',
      photoURL: '',
      publicId: ''
    })

    result = await newData.save()

    // ------- Add person to user -------
    await UserModel.findOneAndUpdate(
      {
        _id: userData._id
      },
      {
        $push: {
          _people: result._id
        },
        $inc: {
          _peopleCount: 1
        }
      }
    )
    // ---X--- Add person to user ---X---

    res.status(201).json({
      error: false,
      data: Interface(result)
    })
  } catch (error) {
    next(error)
  }
}
