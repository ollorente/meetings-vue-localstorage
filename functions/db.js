const mongoose = require('mongoose')

mongoose
  .connect(
    process.env.MONGODB || 'mongodb://localhost:27017/meetingsapp-v1',
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    }
  )
  .then(() => console.log(`>>> [DB] is connected... <<<`))
  .catch((error) => console.log(`<<< [ERROR]: ${error} >>>`))

module.exports = mongoose
