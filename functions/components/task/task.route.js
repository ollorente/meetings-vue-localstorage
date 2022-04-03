const router = require('express').Router()

const verify = require('../../helpers/verifyToken')
const {
  TaskAll,
  TaskAllPeopleByTask,
  TaskGet,
  TaskList,
  TaskPeopleByTask,
  TaskRemove,
  TaskUpdate
} = require('./controllers')

router
  .route('/')
  .get(verify, TaskList)

router
  .route('/all')
  .get(verify, TaskAll)

router
  .route('/:task')
  .get(verify, TaskGet)
  .put(verify, TaskUpdate)
  .delete(verify, TaskRemove)

router
  .route('/:task/people')
  .get(verify, TaskPeopleByTask)

router
  .route('/:task/all-people')
  .get(verify, TaskAllPeopleByTask)

module.exports = router
