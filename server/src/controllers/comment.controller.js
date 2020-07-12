import { get, uniq } from "lodash";
import Post from "../models/post.model";
import Comment from "../models/comment.model";
import errorHandler from "../helpers/dbErrorHandler";

import {
  commentPopulateQuery,
  postPopulateQuery,
} from "../helpers/populateQuery";

const createComment = async (req, res, next) => {
  try {
    const ownerId = get(req, "auth._id");
    const content = get(req, "body.content");
    const post = get(req, "post");
    const postId = get(post, "_id");
    const comment = new Comment({ content: content, owner: ownerId, postId });
    await comment.save();
    const commentId = get(comment, "_id");
    post.comments.push(commentId);
    await post.save();
    await post
      .populate([
        {
          path: "comments",
          populate: [{ path: "owner", select: "name" }],
        },
      ])
      .execPopulate();

    return res.status(200).json({ data: post });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const likeComment = async (req, res, next) => {
  try {
    const userId = get(req, "auth._id");
    const comment = get(req, "comment");
    const postId = get(comment, "postId");
    let likedBy = [...comment.likes];

    const isLiked = likedBy.find(
      (like) => like.toString() === userId.toString()
    );
    if (!isLiked) {
      likedBy.push(userId);
    }
    if (isLiked) {
      likedBy = likedBy.filter((like) => like.toString() !== userId.toString());
    }
    comment.likes = uniq(likedBy);
    await comment.save();
    const post = await Post.findById(postId).populate(postPopulateQuery).exec();

    return res.status(200).json({ data: post });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const comment = get(req, "comment");
    const commentId = get(comment, "_id");
    const postId = get(comment, "postId");
    await Comment.deleteOne({ _id: commentId });

    const post = await Post.findById(postId);
    return res.status(200).json({ message: "Comment deleted", data: post });
  } catch (err) {}
};

const commentById = async (req, res, next, id) => {
  try {
    const comment = await Comment.findById(id)
      .populate(commentPopulateQuery)
      .exec();

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    req.comment = comment;
    next();
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const isPoster = async (req, res, next) => {
  try {
    const isPoster =
      req.auth &&
      req.comment &&
      get(req, "auth._id").toString() === get(comment, "owner._id").toString();

    if (!isPoster) {
      return res.status(403).json({ error: "User is not authorized" });
    }

    next();
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

export default {
  createComment,
  commentById,
  likeComment,
  deleteComment,
  isPoster,
};
