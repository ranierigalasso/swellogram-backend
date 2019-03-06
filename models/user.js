const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  following: [{
    type: ObjectId,
    reference: 'User',
  }],
  profileStatus: {
    type: String,
    default: 'Busy surfing my way through life...'
  },
  profileImg: {
    type: String,
    default: 'https://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png',
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;