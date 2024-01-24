import express from 'express';
import * as postController from '../controllers/postController.js';

const router = express.Router();

// Post-related routes
router.get('/getAllPosts', postController.getAllPosts);
router.post('/create-post', postController.createPost);
router.post('/add-comment', postController.addComment);
router.post('/add-reply', postController.addReply);

export default router;
