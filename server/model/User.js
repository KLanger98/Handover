const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    moderator: {
      type: Boolean,
      required: true
    },
    imageUrl: {
      type: String,
    },
    profession:{
      type: String,
    },
    company: 
      {
        type: Schema.Types.ObjectId,
        ref: 'company',
        required: true
      }   ,
    contactNumber: {
      type: String
    } 
  }
);

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

//add fullname
userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.virtual('initials').get(function () {
  return `${this.firstName.charAt(0)}${this.lastName.charAt(0)}`
})

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

const User = model('user', userSchema);

module.exports = User;
