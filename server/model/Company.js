const { Schema, model } = require('mongoose');

const companySchema = new Schema(
  {
    companyName: {
      type: String,
    },
    companyAddress: {
        type: String,
    },
    companyProcesses: [],
    companyModerators: [],
    companyUsers: [],
    companyTasks: []

  }
);

const Company = model('process', companySchema);

module.exports = Company;
