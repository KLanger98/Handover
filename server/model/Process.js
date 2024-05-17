const { Schema, model } = require('mongoose');

const processSchema = new Schema(
  {
    processTitle: {
      type: String,
      required: true
    },
    processText: {
        type: String,
        required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    processCategory: {
      type: String,
      required: true
    },
    referenceProcesses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'process'
      }
    ]

  }
);

const Process = model('process', processSchema);

module.exports = Process;
