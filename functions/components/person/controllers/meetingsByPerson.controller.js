const PersonModel = require('../person.model')
const { RefInterface } = require('../../meeting/dto')
const paginator = require('../../../helpers/paginator')

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
      _meetings: 1
    }).populate([
      {
        path: '_meetings',
        select: 'name dateInt dateEnd isActive isLock',
        options: {
          limit: P.limit,
          skip: P.page,
          sort: {
            dateInt: 1
          }
        },
        match: {
          isActive: true
        }
      }
    ])

    count = await personData._meetingsCount

    res.status(200).json({
      error: false,
      data: result._meetings.length > 0
        ? result._meetings.map((e) => RefInterface(e))
        : [],
      count
    })
  } catch (error) {
    next(error)
  }
}
