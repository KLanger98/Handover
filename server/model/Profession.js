const { Schema, model } = require('mongoose');

const ProfessionSchema = new Schema(
  {
    professionName: {
      type: String,
    },
    professionDailyTasks: [],
    referrals: [],
});

const Profession = model('profession', ProfessionSchema);

module.exports = Profession;
