const bcrypt = require('bcryptjs')
const md5 = require('md5')

const UserModel = require('../user.model')
const { RefInterface } = require('../dto')
const { registerValidation } = require('../../../helpers/validation')

module.exports = async (req, res, next) => {
  let result
  try {
    /* Validate data */
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).json(error.details[0].message)

    /* Checking if the user is already in the database */
    const emailExist = await UserModel.findOne({
      email: req.body.email
    })
    if (emailExist) {
      return res.status(400).json({
        error: `Email already exist!`
      })
    }

    /* Hash password */
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newData = new UserModel({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email.toLowerCase(),
      password: hashedPassword,
      gravatar: await md5(req.body.email.toLowerCase()),
      provider: 'local'
    })

    result = await newData.save()

    res.status(201).json({
      error: false,
      data: RefInterface(result)
    })
  } catch (error) {
    next(error)
  }
}
