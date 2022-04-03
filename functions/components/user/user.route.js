const router = require('express').Router()

const verify = require('../../helpers/verifyToken')
const {
  UserCreate,
  UserList,
  UserAuth,
  UserAll,
  UserHome,
  UserMeetingsByUser,
  UserAllMeetingsByUser,
  UserPeopleByUser,
  UserAllPeopleByUser,
  UserProjectsByUser,
  UserAllProjectsByUser,
  UserTasksByUser,
  UserAllTasksByUser,
  UserGet,
  UserUpdate,
  UserRemove
} = require('./controllers')

router
  .route('/')
  .post(UserCreate)
  .get(verify, UserList)

router
  .route('/auth')
  .post(UserAuth)

router
  .route('/all')
  .get(verify, UserAll)

router
  .route('/home')
  .get(verify, UserHome)

router
  .route('/meetings')
  .get(verify, UserMeetingsByUser)

router
  .route('/all-meetings')
  .get(verify, UserAllMeetingsByUser)

router
  .route('/people')
  .get(verify, UserPeopleByUser)

router
  .route('/all-people')
  .get(verify, UserAllPeopleByUser)

router
  .route('/projects')
  .get(verify, UserProjectsByUser)

router
  .route('/all-projects')
  .get(verify, UserAllProjectsByUser)

router
  .route('/tasks')
  .get(verify, UserTasksByUser)

router
  .route('/all-tasks')
  .get(verify, UserAllTasksByUser)

router
  .route('/:user')
  .get(verify, UserGet)
  .put(verify, UserUpdate)
  .delete(verify, UserRemove)

module.exports = router
