const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const commentSchema = new Schema({
  creatorId: {
    type: ObjectId,
    ref: 'User',
    required:true,
  },
  postId: {
    type: ObjectId,
    ref: 'Post',
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
},{
  timestamps:true
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

