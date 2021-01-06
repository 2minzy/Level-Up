const crypto = require('crypto');

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      max: 20,
      unique: true,
      index: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    email: {
      type: String,
      trim: true,
      require: true,
      unique: true,
      lowercase: true,
    },
    hashed_password: {
      type: String,
      require: true,
    },
    salt: String,
    role: {
      type: String,
      default: 'subscriber',
    },
    resetPasswordLink: {
      data: String,
      default: '',
    },
  },
  { timestamps: true }
);

// virtual fields
userSchema
  .virtual('password')
  .set(function (password) {
    // create temp variable called _password
    this._password = password;
    // generate salt
    this.salt = this.makeSalt();
    // encrypt password
    this.hashed_password = this.encryptPassword(password);
  })

  .get(function () {
    return this._password;
  });

// methods => authenticate, encryptPassword, makeSalt
userSchema.methods = {
  authenticate: function (enteredPassword) {
    return this.encryptPassword(enteredPassword) == this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  },
};

// export the user model
module.exports = mongoose.model('User', userSchema);
