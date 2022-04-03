const router = require('express').Router()

const verify = require('../../helpers/verifyToken')
const { MeetingCreate } = require('../meeting/controllers')
const {
  ProjectAll,
  ProjectAllMeetingsByProject,
  ProjectAllPeopleByProject,
  ProjectAllTasksByProject,
  ProjectCreate,
  ProjectGet,
  ProjectList,
  ProjectMeetingsByProject,
  ProjectPeopleByProject,
  ProjectRemove,
  ProjectTasksByProject,
  ProjectUpdate
} = require('./controllers')

router
  .route('/')
  .post(verify, ProjectCreate)
  .get(verify, ProjectList)

router
  .route('/all')
  .get(verify, ProjectAll)

router
  .route('/:project')
  .get(verify, ProjectGet)
  .put(verify, ProjectUpdate)
  .delete(verify, ProjectRemove)

router
  .route('/:project/meetings')
  .post(verify, MeetingCreate)
  .get(verify, ProjectMeetingsByProject)

router
  .route('/:project/all-meetings')
  .get(verify, ProjectAllMeetingsByProject)

router
  .route('/:project/people')
  .get(verify, ProjectPeopleByProject)

router
  .route('/:project/all-people')
  .get(verify, ProjectAllPeopleByProject)

router
  .route('/:project/tasks')
  .get(verify, ProjectTasksByProject)

router
  .route('/:project/all-tasks')
  .get(verify, ProjectAllTasksByProject)

module.exports = router
