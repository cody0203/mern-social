import express from "express";

import authControllers from "../controllers/auth.controllers";
import commentControllers from "../controllers/comment.controller";
import postControllers from "../controllers/post.controllers";

const router = express.Router();

router
  .route("/api/comment/:postId")
  .post(authControllers.requireSignIn, commentControllers.createComment);
// .delete(authControllers.requireSignIn, authControllers.hasAuthorization, postControllers.deleteComment);

router.param("postId", postControllers.postById);

export default router;
