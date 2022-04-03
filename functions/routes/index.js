const router = require('express').Router()
const pkg = require('../../package.json')

const MeetingRoute = require('../components/meeting/meeting.route')
const PersonRoute = require('../components/person/person.route')
const ProjectRoute = require('../components/project/project.route')
const TaskRoute = require('../components/task/task.route')

/* HOME */
router.get('/', function (req, res, next) {
  res.status(200).json({
    message: 'Welcome to MeeetingsApp APIRestful!',
    name: pkg.name,
    desciption: pkg.description,
    author: pkg.author,
    version: pkg.version
  })
})

router.use('/meetings', MeetingRoute)
router.use('/people', PersonRoute)
router.use('/projects', ProjectRoute)
router.use('/tasks', TaskRoute)

/* ERROR */
router.get('*', function (req, res, next) {
  res.status(404).json({
    error: true,
    message: 'Page not found'
  })
})

module.exports = router
