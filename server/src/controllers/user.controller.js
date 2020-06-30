import extend from 'lodash/extend';

import User from '../models/user.model';
import errorHandler from '../helpers/dbErrorHandler';

const list = async (req, res, next) => {
  try {
    const users = await User.find({}).select('name email updated created');
    return res.status(200).json({ data: users });
  } catch (err) {
    return res.status(404).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const create = async (req, res, next) => {
  const user = new User(req.body);
  try {
    await user.save();

    return res.status(200).json({ message: 'Successfully signed up!' });
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
  try {
    let user = req.profile;
    user = extend(user, req.body);
    user.updated = Date.now();
    await user.save();

    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
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

const userById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id).select('name email updated created bio');

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

export default { list, create, read, update, remove, userById };
