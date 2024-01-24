// commentModel.js
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  text: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: String,
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
