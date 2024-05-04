const { Schema, model } = require('mongoose');

const ProcessSchema = new Schema(
  {
    email: {
      type: String,
    },
    firstName: {
        type: Text,
    },
    lastName: {
      type: Date,
      default: Date.now,
    },
    userProfession: [],
    
  }
);

const Process = model('process', ProcessSchema);

module.exports = Process;
