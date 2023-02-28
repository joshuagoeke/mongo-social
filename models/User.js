const { Schema, model } = require('mongoose');


// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      }],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      }],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

userSchema
.virtual('friendCount')
.get(function () {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
