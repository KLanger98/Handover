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
    imageUrl: {
      type: String,
    },
    userProfession: [
            {
                type: Schema.Types.ObjectId,
                ref: 'profession'
            }
        ],
    company: 
      {
        type: Schema.Types.ObjectId,
        ref: 'company'
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

const User = model('user', userSchema);

module.exports = User;
