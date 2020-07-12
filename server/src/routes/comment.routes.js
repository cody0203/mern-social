import express from "express";

import authControllers from "../controllers/auth.controllers";
import commentControllers from "../controllers/comment.controller";
import postControllers from "../controllers/post.controllers";

const router = express.Router();

router
  .route("/api/comment/:postId")
  .post(authControllers.requireSignIn, commentControllers.createComment);
// .delete(authControllers.requireSignIn, authControllers.hasAuthorization, postControllers.deleteComment);

router
  .route("/api/comment/like/:commentId")
  .put(authControllers.requireSignIn, commentControllers.likeComment);

router
  .route("/api/comment/:commentId")
  .put(authControllers.requireSignIn, commentControllers.createReply)
  .delete(
    authControllers.requireSignIn,
    commentControllers.isPoster,
    commentControllers.deleteComment
  );

router.param("postId", postControllers.postById);

router.param("commentId", commentControllers.commentById);

export default router;
