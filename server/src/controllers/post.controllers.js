import { get, extend, uniq, filter } from "lodash";
import Post from "../models/post.model";
import User from "../models/user.model";
import Comment from "../models/comment.model";
import errorHandler from "../helpers/dbErrorHandler";
import { postPopulateQuery } from "../helpers/populateQuery";

const queryPost = async ({ query, page, limit }) => {
  const data = await Post.find(query)
    .sort({ created: "desc" })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate(postPopulateQuery)
    .exec();

  const countDocs = await Post.countDocuments(query);

  const meta = {
    total: countDocs,
    current_page: page,
    per_page: limit,
    page_size: data.length,
    total_page: Math.ceil(countDocs / limit),
  };
  return { data, meta };
};

const getPosts = async (req, res, next) => {
  try {
    const page = parseInt(get(req, "query.page")) || 1;
    const limit = parseInt(get(req, "query.limit")) || 10;

    const userId = get(req, "auth._id");
    const user = await User.findById(userId);
    const following = get(user, "following");
    following.push(userId);

    const query = {
      owner: { $in: following },
      $or: [{ owner: userId }, { public: true }],
    };

    const { data, meta } = await queryPost({ query, page, limit });

    return res.status(200).json({ data: data, meta });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const getPost = async (req, res, next) => {
  try {
    const userId = get(req, "profile._id");
    const page = parseInt(get(req, "query.page")) || 1;
    const limit = parseInt(get(req, "query.limit")) || 10;

    const query = { owner: userId };
    const { data, meta } = await queryPost({ query, page, limit });

    return res.status(200).json({ data: data, meta });
  } catch (err) {
    console.log(err);
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
    console.log(err);
    return res.status(404).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const updatePost = async (req, res, next) => {
  try {
    let post = req.post;
    post = extend(post, req.body);

    await post.save();

    return res
      .status(200)
      .json({ message: "Update post successfully", data: post });
  } catch (err) {
    return res.status(404).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = req.post;
    const postId = get(post, "_id");
    await Post.deleteOne({ _id: postId });

    return res.status(200).json({ message: "Deleted", data: post });
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
    const post = await Post.findById(id).populate(postPopulateQuery).exec();

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
  getPost,
  updatePost,
  postById,
  isOwner,
  likePost,
  deletePost,
};
