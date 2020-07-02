import { get } from "lodash";
import Post from "../models/post.model";
import User from "../models/user.model";
import errorHandler from "../helpers/dbErrorHandler";

const getPosts = async (req, res, next) => {
  try {
    console.log(get(req, "auth"));
    const userId = get(req, "auth._id");
    const user = await User.findById(userId);
    const following = get(user, "following");
    following.push(userId);

    const posts = await Post.find({ _id: { $nin: following } });

    return res.status(200).json({ data: posts });
  } catch (err) {
    return res.status(404).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const createPost = async (req, res, next) => {
  try {
    const owner = get(req, "auth._id");
    const post = new Post({ ...req.body, owner });

    const createdPost = await post.save();
    return res
      .status(200)
      .json({ message: "Successfully created post", data: createdPost });
  } catch (err) {
    return res.status(404).json({ error: errorHandler.getErrorMessage(err) });
  }
};

export default { createPost, getPosts };
