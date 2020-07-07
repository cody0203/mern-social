import express from "express";
import authControllers from "../controllers/auth.controller";
import postControllers from "../controllers/post.controllers";
import userControllers from "../controllers/user.controller";

const router = express.Router();

router
  .route("/api/posts")
  .get(authControllers.requireSignIn, postControllers.getPosts);

router
  .route("/api/post/")
  .post(authControllers.requireSignIn, postControllers.createPost);

router
  .route("/api/post/:postId")
  .put(
    authControllers.requireSignIn,
    postControllers.isOwner,
    postControllers.updatePost
  );
// .delete(authControllers.requireSignIn, authControllers.hasAuthorization, postControllers.deletePost);

router
  .route("/api/post/comment/:postId")
  .put(authControllers.requireSignIn, postControllers.createComment);
// .delete(authControllers.requireSignIn, authControllers.hasAuthorization, postControllers.deleteComment);

router
  .route("/api/post/like/:postId")
  .put(authControllers.requireSignIn, postControllers.likePost);

router
  .route("/api/post/:userId")
  .get(authControllers.requireSignIn, postControllers.getPost);

router.param("userId", userControllers.userById);

router.param("postId", postControllers.postById);

export default router;
