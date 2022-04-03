const { Schema, model } = require('mongoose')

const dbSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: String,
    photoURL: String,
    publicId: String,
    role: String,
    owner: {
      type: Schema.ObjectId,
      ref: 'User'
    },
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

module.exports = model('Person', dbSchema)
