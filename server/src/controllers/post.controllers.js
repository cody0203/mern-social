import { get, extend, uniq, filter } from "lodash";
import Post from "../models/post.model";
import User from "../models/user.model";
import errorHandler from "../helpers/dbErrorHandler";

const getPosts = async (req, res, next) => {
  try {
    const userId = get(req, "auth._id");
    const user = await User.findById(userId);
    const following = get(user, "following");
    following.push(userId);

    const posts = await Post.find({
      owner: { $in: following },
      $or: [{ owner: userId }, { public: true }],
    })
      .sort({ created: "desc" })
      .populate("owner", "name")
      .populate("comments.poster", "name")
      .exec();

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
    await createdPost.populate("owner", "name").execPopulate();

    return res
      .status(200)
      .json({ message: "Successfully created post", data: createdPost });
  } catch (err) {
    return res.status(404).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const updatePost = async (req, res, next) => {
  try {
    let post = req.post;
    post = extend(post, req.body);
    console.log(post);
    await post.save();

    return res
      .status(200)
      .json({ message: "Update post successfully", data: post });
  } catch (err) {
    return res.status(404).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const likePost = async (req, res, next) => {
  try {
    const userId = get(req, "auth._id");
    const post = get(req, "post");
    let likedBy = [...post.likes];

    const isLiked = likedBy.find(
      (like) => like.toString() === userId.toString()
    );
    if (!isLiked) {
      likedBy.push(userId);
    }

    if (isLiked) {
      likedBy = likedBy.filter((like) => like.toString() !== userId.toString());
    }

    post.likes = uniq(likedBy);

    await post.save();
    await post.populate("comments.poster", "name").execPopulate();

    return res.status(200).json({ data: post });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const createComment = async (req, res, next) => {
  try {
    const post = get(req, "post");
    post.comments.push(req.body);
    console.log(req.body);
    await post.save();
    await post.populate("comments.poster", "name").execPopulate();

    return res.status(200).json({ data: post });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const isOwner = (req, res, next) => {
  const owner =
    req.post &&
    req.auth &&
    req.post.owner._id.toString() === req.auth._id.toString();

  if (!owner) {
    return res.status(403).json({ error: "User is not authorized" });
  }

  next();
};

const postById = async (req, res, next, id) => {
  try {
    const post = await Post.findById(id).populate("owner", "name").exec();

    if (!post) {
      return res.status(400).json({ error: "Post not found" });
    }

    req.post = post;
    next();
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

export default {
  createPost,
  getPosts,
  updatePost,
  postById,
  isOwner,
  likePost,
  createComment,
};
