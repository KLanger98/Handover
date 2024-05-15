const { Schema, model } = require('mongoose');

const professionSchema = new Schema(
  {
    professionName: {
      type: String,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: 'company'
    }
    // professionDailyTasks: [],
    // referrals: [],
});

const Profession = model('profession', professionSchema);

module.exports = Profession;
