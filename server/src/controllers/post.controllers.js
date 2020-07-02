import Post from '../models/post.model';
import errorHandler from '../helpers/dbErrorHandler';

const createPost = async (req, res, next) => {
  try {
    const post = new Post(req.body);

    const post = await post.save();
    return res.status(200).json({ message: 'Successfully created post', data: post });
  } catch (err) {
    return res.status(404).json({ error: errorHandler.getErrorMessage(err) });
  }
};

export default { createPost };
