const router = require('express').Router()

const verify = require('../../helpers/verifyToken')
const {
  MeetingAll,
  MeetingAllPeopleByMeeting,
  MeetingAllTasksByMeeting,
  MeetingTasksByMeeting,
  MeetingGet,
  MeetingList,
  MeetingPeopleByMeeting,
  MeetingRemove,
  MeetingUpdate
} = require('./controllers')
const { TaskCreate } = require('../task/controllers')

router
  .route('/')
  .get(verify, MeetingList)

router
  .route('/all-meetings')
  .get(verify, MeetingAll)

router
  .route('/:meeting')
  .get(verify, MeetingGet)
  .put(verify, MeetingUpdate)
  .delete(verify, MeetingRemove)

router
  .route('/:meeting/tasks')
  .post(verify, TaskCreate)
  .get(verify, MeetingTasksByMeeting)

router
  .route('/:meeting/all-tasks')
  .get(verify, MeetingAllTasksByMeeting)

router
  .route('/:meeting/people')
  .get(verify, MeetingPeopleByMeeting)

router
  .route('/:meeting/all-people')
  .get(verify, MeetingAllPeopleByMeeting)

module.exports = router
