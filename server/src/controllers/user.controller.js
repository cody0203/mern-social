import fs from "fs";

import extend from "lodash/extend";
import get from "lodash/get";
import formidable from "formidable";
import User from "../models/user.model";
import errorHandler from "../helpers/dbErrorHandler";

const list = async (req, res, next) => {
  try {
    const users = await User.find({}).select("name email updated created");
    return res.status(200).json({ data: users });
  } catch (err) {
    return res.status(404).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const create = async (req, res, next) => {
  const user = new User(req.body);
  try {
    await user.save();

    return res.status(200).json({ message: "Successfully signed up!" });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const read = (req, res, next) => {
  try {
    const user = req.profile;
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const update = async (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Photo could not be uploaded" });
    }

    let user = req.profile;
    user = extend(user, fields);
    user.updated = Date.now();

    if (files.avatar) {
      user.avatar.data = fs.readFileSync(files.avatar.path);
      user.avatar.contentType = files.avatar.type;
    }

    try {
      await user.save();

      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }
  });
};

const remove = async (req, res, next) => {
  try {
    const user = req.profile;
    const deletedUser = await user.remove();

    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const avatar = async (req, res, next) => {
  const avatarObj = get(req, "profile.avatar");
  const avatarData = get(avatarObj, "data");
  const avatarContentType = get(avatarObj, "contentType");

  if (avatarData) {
    res.set("Content-Type", avatarContentType);
    return res.send(avatarData);
  }

  return res.send({});
};

const addFollowing = async (req, res, next) => {
  try {
    const { followerId, followingId } = get(req, "body");

    await User.findByIdAndUpdate(followerId, {
      $push: { following: followingId },
    });

    next();
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const addFollower = async (req, res, next) => {
  try {
    const { followerId, followingId } = get(req, "body");

    console.log(followerId, followingId);
    const user = await User.findByIdAndUpdate(
      followingId,
      {
        $push: { followers: followerId },
      },
      { new: true }
    )
      .select("name email updated created bio avatar")
      .populate("following", "_id name")
      .populate("followers", "_id name")
      .exec();

    return res.status(200).json({ message: "Successfully", data: user });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const removeFollowing = async (req, res, next) => {};
const removeFollower = async (req, res, next) => {};

const userById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id)
      .select("name email updated created bio avatar")
      .populate("following", "_id name")
      .populate("followers", "_id name")
      .exec();

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

export default {
  list,
  create,
  read,
  update,
  remove,
  userById,
  avatar,
  addFollowing,
  addFollower,
  removeFollowing,
  removeFollower,
};
