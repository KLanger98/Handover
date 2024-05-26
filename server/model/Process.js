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
    ],
    flags: [{
      type: Schema.Types.ObjectId,
      ref: 'flag'
    }],
    company: {
      type: Schema.Types.ObjectId,
      ref: 'company'
    }

  }
);


const Process = model('process', processSchema);

module.exports = Process;
