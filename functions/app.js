require('dotenv').config()
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const history = require('connect-history-api-fallback')
const serverless = require('serverless-http')
const { error404, errorHandler } = require('./middlewares')

const app = express()
require('./db')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(
  express.urlencoded({
    extended: false
  })
)
app.use(cookieParser())

app.use('/.netlify/functions/app', require('./routes'))
// app.use('/.netlify/functions/app/users', require('./components/user/user.route'))

app.use(history())
app.use(express.static(path.join(__dirname, 'public')))

// catch 404 and forward to error handler
app.use(error404)
// error handler
app.use(errorHandler)

module.exports.handler = serverless(app)
