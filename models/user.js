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
  profileImg: {
    type: String,
    default: 'https://i.imgur.com/gtWsPu9.jpg',
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;