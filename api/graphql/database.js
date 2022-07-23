const { connect } = require('mongoose')

module.exports = connect(process.env.MONGODB || process.env.MONGODB_DEV, {})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err))