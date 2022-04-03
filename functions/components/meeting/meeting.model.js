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
    project: {
      type: Schema.ObjectId,
      ref: 'Project'
    },
    dateEnd: {
      type: Date,
      default: Date.now()
    },
    dateInt: {
      type: Date,
      default: Date.now()
    },
    owner: {
      type: Schema.ObjectId,
      ref: 'User'
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

module.exports = model('Meeting', dbSchema)
