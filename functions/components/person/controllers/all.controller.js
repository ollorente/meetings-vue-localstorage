const PersonModel = require('../person.model')
const { RefInterface } = require('../dto')

module.exports = async (req, res, next) => {
  let result, count
  try {
    result = await PersonModel.find(
      {
        owner: req.user._id,
        isActive: true,
        isLock: false
      },
      {
        name: 1,
        photoURL: 1,
        email: 1,
        isActive: 1,
        isLock: 1
      }
    ).sort({
      name: 1
    })

    count = await PersonModel.countDocuments({
      owner: req.user._id,
      isActive: true,
      isLock: false
    })

    res.status(200).json({
      error: false,
      data: result.length > 0 ? result.map((e) => RefInterface(e)) : [],
      count
    })
  } catch (error) {
    next(error)
  }
}
