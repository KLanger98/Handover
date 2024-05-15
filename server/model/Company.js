const { Schema, model, mongoose } = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true
    },
    companyAddress: {
        type: String,
        required: true
    },
    companyProcesses: [{
        type: Schema.Types.ObjectId,
        ref: 'process'
      }]
    ,
    companyModerators: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    ],
    companyUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    ],
    companyTasks: []

  }
);

const Company = model('company', companySchema);

module.exports = Company;
