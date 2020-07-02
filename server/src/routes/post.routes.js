import express from "express";
import authControllers from "../controllers/auth.controller";
import postControllers from "../controllers/post.controllers";

const router = express.Router();

router
  .route("/api/posts")
  .get(authControllers.requireSignIn, postControllers.getPosts);

router
  .route("/api/post/")
  .post(authControllers.requireSignIn, postControllers.createPost);

// router
//   .route('/api/post/:postId')
//   .delete(authControllers.requireSignIn, authControllers.hasAuthorization, postControllers.deletePost);

// router
//   .route('/api/post/comment/:postId')
//   .put(authControllers.requireSignIn, postControllers.createComment)
//   .delete(authControllers.requireSignIn, authControllers.hasAuthorization, postControllers.deleteComment);

// router.route('/api/post/like/:postId').put(authControllers.requireSignIn, postControllers.likePost);

// router.route('/api/post/unlike/:postId').put(authControllers.requireSignIn, postControllers.unLikePost);

// router.route('/api/post/:userId').get(authControllers.requireSignIn, postControllers.getPost);

// router.param('userId', userControllers.userById);

export default router;
