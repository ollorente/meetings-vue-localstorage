const { Schema, model } = require('mongoose')

const dbSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: String,
    _collaborators: [
      {
        type: Schema.ObjectId,
        ref: 'Person'
      }
    ],
    _collaboratorsCount: {
      type: Number,
      default: 0
    },
    owner: {
      type: Schema.ObjectId,
      ref: 'User'
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

module.exports = model('Project', dbSchema)
