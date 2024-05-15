const { Schema, model } = require('mongoose');

const taskSchema = new Schema(
  {
    taskTitle: {
      type: String,
      required: true
    },
    taskText: {
        type: String,
        required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    referenceProcesses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'process'
      }
    ],
    taskCompleted: {
        type: Boolean, 
        default: false
    }

  }
);

const Task = model('task', taskSchema);

module.exports = Task;
