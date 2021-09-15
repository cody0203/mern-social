import request from '../../request/connect';
import * as endPoints from '../../request/end-point';

export const fetchUserList = () => request.get(endPoints.USERS);

export const fetchWhoToFollow = (id) => request.get(`${endPoints.USERS}/who-to-following/${id}`);

export const signUp = (params) => request.post(endPoints.USERS, params);

export const fetchUser = (id) => request.get(`${endPoints.USER}/${id}`);

export const removeUser = (id) => request.delete(`${endPoints.USER}/${id}`);

export const updateUser = ({ userId, params }) => request.put(`${endPoints.USER}/${userId}`, params);

export const fetchUserAvatar = (id) => request.get(`${endPoints.USER}/avatar/${id}`);

export const followUser = (params) => request.put(`${endPoints.USER}/following`, params);

export const unFollowUser = (params) => request.put(`${endPoints.USER}/unfollow`, params);
