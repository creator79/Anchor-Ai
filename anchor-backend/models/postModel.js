// postModel.js
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: String,
  desc: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

const Post = mongoose.model('Post', postSchema);

export default Post;
