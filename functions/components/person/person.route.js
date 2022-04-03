const router = require('express').Router()

const verify = require('../../helpers/verifyToken')
const {
  PersonAll,
  PersonAllMeetingsByPerson,
  PersonAllProjectsByPerson,
  PersonAllTasksByPerson,
  PersonCreate,
  PersonGet,
  PersonList,
  PersonMeetingsByPerson,
  PersonProjectsByPerson,
  PersonRemove,
  PersonTasksByPerson,
  PersonUpdate
} = require('./controllers')

router
  .route('/')
  .post(verify, PersonCreate)
  .get(verify, PersonList)

router
  .route('/all')
  .get(verify, PersonAll)

router
  .route('/:person')
  .get(verify, PersonGet)
  .put(verify, PersonUpdate)
  .delete(verify, PersonRemove)

router
  .route('/:person/meetings')
  .get(verify, PersonMeetingsByPerson)

router
  .route('/:person/all-meetings')
  .get(verify, PersonAllMeetingsByPerson)

router
  .route('/:person/projects')
  .get(verify, PersonProjectsByPerson)

router
  .route('/:person/all-projects')
  .get(verify, PersonAllProjectsByPerson)

router
  .route('/:person/tasks')
  .get(verify, PersonTasksByPerson)

router
  .route('/:person/all-tasks')
  .get(verify, PersonAllTasksByPerson)

module.exports = router
