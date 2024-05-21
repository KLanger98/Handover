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
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    formattedDate: {
      type: String,
    },
    processCategory: {
      type: String,
      required: true
    },
    processSubCategory: {
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
