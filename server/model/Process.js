const { Schema, model } = require('mongoose');

const ProcessSchema = new Schema(
  {
    processTitle: {
      type: String,
    },
    processText: {
        type: Text,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    DOB: {
      type: Date
    },
    category: {
      type: String
    }

  }
);

const Process = model('process', ProcessSchema);

module.exports = Process;
