const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const postSchema = new Schema({
  creatorId: {
    type: ObjectId,
    ref: 'User',
  },
  location: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
},{
  timestamps:true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

