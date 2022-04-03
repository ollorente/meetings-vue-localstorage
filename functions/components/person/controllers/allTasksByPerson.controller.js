const paginator = require('../../../helpers/paginator')
const PersonModel = require('../person.model')
const { RefInterface } = require('../../task/dto')

module.exports = async (req, res, next) => {
  const P = paginator(req.query.limit, req.query.page)

  const personData = await PersonModel.findOne({
    _id: req.params.person
  })
  if (!personData) {
    return res.status(500).json({
      error: true,
      message: 'user not found!'
    })
  }

  let result, count
  try {
    result = await PersonModel.findById(personData._id, {
      _tasks: 1
    }).populate([
      {
        path: '_tasks',
        select: 'name project isActive isLock',
        options: {
          limit: P.limit,
          skip: P.page,
          sort: {
            name: 1
          }
        },
        match: {
          isActive: true
        },
        populate: {
          path: 'project',
          select: 'name',
          match: {
            isActive: true,
            isLock: false
          }
        }
      }
    ])

    count = await personData._tasksCount

    res.status(200).json({
      error: false,
      data: result._tasks.length > 0
        ? result._tasks.map((e) => RefInterface(e))
        : [],
      count
    })
  } catch (error) {
    next(error)
  }
}
