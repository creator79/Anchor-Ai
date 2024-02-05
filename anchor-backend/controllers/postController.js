// postController.js
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Comment from "../models/commentModel.js";
import Reply from "../models/replyModel.js";

import { sendEmail } from "../views/notificationTemplate.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({
        path: "user",
        select: "username",
      })
      .populate({
        path: "comments",
        populate: {
          path: "replies",
          model: "Reply",
          populate: {
            path: "user",
            model: "User",
          },
        },
      });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
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

    // check if user exists and not empty
  
    if (!userId || userId === "" || description === "" || title === "") {
      return res.status(400).json({ error: "Enter the details Correctly" });
    }
    await post.save();

    const user = await User.findById(userId);
    sendEmail(user.email, "Congrats your post is live now");

    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // console.log(post);
    // go with all commments id and find all comments and only send text and user name in json response
    const comments = await Comment.find({ _id: { $in: post.comments } })
      .select("text user")
      .populate({
        path: "user",
        select: "username",
      });
    // console.log(comments);
    res.json({ comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getReplyById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: "Comment id not provided" });
    }

    const comment = await Comment.findById(req.params.id);
    const replies = await Reply.find({ _id: { $in: comment.replies } })
      .select("text user")
      .populate({
        path: "user",
        select: "username",
      });
    res.json({ replies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addComment = async (req, res) => {
  
  try {
    const { text, userId, postId } = req.body;

    if (!text || text === "" || !userId || userId === "" || !postId || postId === "") {
      return res.status(400).json({ error: "Enter the details Correctly" });
    }


    const comment = new Comment({
      text,
      user: userId,
      username: "",
    });

    await comment.save();

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.comments.push(comment);
    await post.save();

    comment.username = (await User.findById(userId)).username;
    await comment.save();

    const postUser = await User.findById(post.user);
    const postTitle = post.title;
    sendEmail(
      postUser.email,
      `${comment.username} commented on your post "${postTitle}"`
    );

    res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addReply = async (req, res) => {
  try {
    const { text, userId, commentId } = req.body;
    if (!text || text === "" || !userId || userId === "" || !commentId || commentId === "") {
      return res.status(400).json({ error: "Enter the details Correctly" });
    }

    const reply = new Reply({
      text,
      user: userId,
      comment: commentId,
    });

    await reply.save();

    // find post creator and send email
    //     comment id --> post collection --> comments array check  same comment id ---> find user id of that post --->  user collection  --->match id
    // -----> find email of that id and send email to that original user

    const post = await Post.findOne({ comments: commentId });
    const user = await User.findById(post.user);
    const originalPostUser = user.email;

    // console.log(originalPostUser);
    sendEmail(
      originalPostUser,
      `${(await User.findById(userId)).username} replied on your post`
    );


    const comment = await Comment.findById(commentId);
  
    comment.replies.push(reply);
    await comment.save();

    reply.username = (await User.findById(userId)).username;
    await reply.save();

    const originalCommentUser = await User.findById(comment.user);
    sendEmail(
      originalCommentUser.email,
      `${reply.username} replied to your comment "${comment.text}"`
    );

    res.status(201).json({ message: "Reply added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
