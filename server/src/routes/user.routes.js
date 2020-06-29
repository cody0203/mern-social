import express from 'express';

import userControllers from '../controllers/user.controller';
import authControllers from '../controllers/auth.controller';

const router = express.Router();

router.route('/api/users').get(userControllers.list).post(userControllers.create);

router
  .route('/api/user/:userId')
  .get(authControllers.requireSignIn, userControllers.read)
  .put(authControllers.requireSignIn, authControllers.hasAuthorization, userControllers.update)
  .delete(authControllers.requireSignIn, authControllers.hasAuthorization, userControllers.remove);

router.param('userId', userControllers.userById);

export default router;
