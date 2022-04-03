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
    meeting: {
      type: Schema.ObjectId,
      ref: 'Meeting'
    },
    project: {
      type: Schema.ObjectId,
      ref: 'Project'
    },
    owner: {
      type: Schema.ObjectId,
      ref: 'User'
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

module.exports = model('Task', dbSchema)
