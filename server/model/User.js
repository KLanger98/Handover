const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    firstName: {
        type: Text,
    },
    lastName: {
      type: Date,
      default: Date.now,
    },
    password: {
      type: String,
      required: true,
    },
    userProfession: [],
    
  }
);

const User = model('user', userSchema);

module.exports = User;
