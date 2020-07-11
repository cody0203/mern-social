import get from "lodash/get";
import Post from "../models/post.model";
import Comment from "../models/comment.model";
import errorHandler from "../helpers/dbErrorHandler";

const createComment = async (req, res, next) => {
  try {
    const ownerId = get(req, "auth._id");
    const content = get(req, "body.content");
    const comment = new Comment({ content: content, owner: ownerId });
    await comment.save();
    const commentId = get(comment, "_id");
    const post = get(req, "post");
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

export default { createComment };
