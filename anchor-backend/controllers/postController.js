// postController.js
import Post from '../models/postModel.js';
import User from '../models/userModel.js';
import Comment from '../models/commentModel.js';
import Reply from '../models/replyModel.js';

import { sendEmail } from '../views/notificationTemplate.js';



export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate({
      path: 'user',
      select: 'username',
    }).populate({
      path: 'comments',
      populate: {
        path: 'replies',
        model: 'Reply',
        populate: {
          path: 'user',
          model: 'User',
        },
      },
    });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, desc, userId } = req.body;

    const post = new Post({
      title,
      desc,
      user: userId,
    });

    await post.save();

    const user = await User.findById(userId);
    sendEmail(user.email, 'Congrats your post is live now');

    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const addComment = async (req, res) => {
  try {
    const { text, userId, postId } = req.body;

    const comment = new Comment({
      text,
      user: userId,
      username: '',
    });

    await comment.save();

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.comments.push(comment);
    await post.save();

    comment.username = (await User.findById(userId)).username;
    await comment.save();

    const postUser = await User.findById(post.user);
    const postTitle = post.title;
    sendEmail(postUser.email, `${comment.username} commented on your post "${postTitle}"`);

    res.status(201).json({ message: 'Comment added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const addReply = async (req, res) => {
  try {
    const { text, userId, commentId } = req.body;

    const reply = new Reply({
      text,
      user: userId,
    });

    await reply.save();

    const comment = await Comment.findById(commentId);
    comment.replies.push(reply);
    await comment.save();

    reply.username = (await User.findById(userId)).username;
    await reply.save();

    const originalCommentUser = await User.findById(comment.user);
    sendEmail(originalCommentUser.email, `${reply.username} replied to your comment "${comment.text}"`);

    res.status(201).json({ message: 'Reply added successfully' });
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
}
};
