const { Schema, model, mongoose } = require('mongoose');

const signInSchema = new Schema(
  {
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    date: {
        type: Date,
        default: Date.now,
    },
  }
);


signInSchema.virtual('formattedDate').get(function() {
    return this.date.toLocaleDateString();
});

const SignIn = model('signin', signInSchema);

module.exports = SignIn;
