const { Schema, model } = require('mongoose')

const dbSchema = new Schema(
  {
    name: {
      type: String,
      max: 256,
      min: 3
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      max: 30,
      min: 3
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      max: 255,
      min: 3
    },
    phone: {
      type: String,
      max: 20,
      min: 6
    },
    photoURL: String,
    gravatar: String,
    provider: String,
    _projects: [
      {
        type: Schema.ObjectId,
        ref: 'Project'
      }
    ],
    _projectsCount: {
      type: Number,
      default: 0
    },
    _meetings: [
      {
        type: Schema.ObjectId,
        ref: 'Meeting'
      }
    ],
    _meetingsCount: {
      type: Number,
      default: 0
    },
    _tasks: [
      {
        type: Schema.ObjectId,
        ref: 'Task'
      }
    ],
    _tasksCount: {
      type: Number,
      default: 0
    },
    _people: [
      {
        type: Schema.ObjectId,
        ref: 'Person'
      }
    ],
    _peopleCount: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isLock: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('User', dbSchema)
