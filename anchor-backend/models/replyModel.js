// replyModel.js
import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
  text: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: String,
});

const Reply = mongoose.model('Reply', replySchema);

export default Reply;
