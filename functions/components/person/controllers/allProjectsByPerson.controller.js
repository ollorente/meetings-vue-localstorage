const paginator = require('../../../helpers/paginator')
const PersonModel = require('../person.model')
const { RefInterface } = require('../../project/dto')

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
      _projects: 1
    }).populate([
      {
        path: '_projects',
        select: 'name _tasks _tasksCount isActive isLock',
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
          path: '_tasks',
          select: '_id',
          match: {
            isActive: true,
            isLock: false
          }
        }
      }
    ])

    count = await personData._projectsCount

    res.status(200).json({
      error: false,
      data: result._projects.length > 0
        ? result._projects.map((e) => RefInterface(e))
        : [],
      count
    })
  } catch (error) {
    next(error)
  }
}
