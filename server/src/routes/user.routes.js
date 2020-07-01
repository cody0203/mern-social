import express from "express";

import userControllers from "../controllers/user.controller";
import authControllers from "../controllers/auth.controller";

const router = express.Router();

router
  .route("/api/users")
  .get(userControllers.list)
  .post(userControllers.create);

router
  .route("/api/user/following")
  .put(
    authControllers.requireSignIn,
    userControllers.addFollowing,
    userControllers.addFollower
  );

router
  .route("/api/user/unfollow")
  .put(
    authControllers.requireSignIn,
    userControllers.removeFollowing,
    userControllers.removeFollower
  );

router
  .route("/api/user/:userId")
  .get(authControllers.requireSignIn, userControllers.read)
  .put(
    authControllers.requireSignIn,
    authControllers.hasAuthorization,
    userControllers.update
  )
  .delete(
    authControllers.requireSignIn,
    authControllers.hasAuthorization,
    userControllers.remove
  );

router.route("/api/user/avatar/:userId").get(userControllers.avatar);

router.param("userId", userControllers.userById);

export default router;
