import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  text: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }, // Add this line to reference the Post model
  username: String,
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
