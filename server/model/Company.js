const { Schema, model, mongoose } = require('mongoose');

const companySchema = new Schema(
  {
    companyName: {
      type: String,
      required: true
    },
    companyAddress: {
        type: String,
    },
    companyDescription: {
      type: String
    },
    companyImage: {
      type: String,
    },
    companyMap: {
      type: String
    },
    dashboardText: {
      type: String
    },
    companyProcesses: [{
        type: Schema.Types.ObjectId,
        ref: 'process'
      }]
    ,
    companyModerators: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
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
