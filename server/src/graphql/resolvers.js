import User from '../models/user.model';
import errorHandler from '../helpers/dbErrorHandler';

const resolvers = {
  createUser: async function ({ userInput }, req) {
    try {
      const user = new User(userInput);
      await user.save();

      return { ...user._doc, _id: user._id.toString() };
    } catch (err) {
      err.data = errorHandler.getErrorMessage(err);
      err.code = 404;
      return err;
      // return res.status(404).json({ error: errorHandler.getErrorMessage(err) });
    }
  },
};

export default resolvers;
