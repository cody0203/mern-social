import request from "../../request/connect";
import * as endPoints from "../../request/end-point";

export const fetchPostList = (params) =>
  request.get(endPoints.POSTS, { params });

export const createPost = ({ params }) => request.post(endPoints.POST, params);

export const updatePost = ({ id, params }) =>
  request.put(`${endPoints.POST}/${id}`, params);

export const deletePost = (id) => request.delete(`${endPoints.POST}/${id}`);

export const likePost = (id) => request.put(`${endPoints.POST}/like/${id}`);

export const fetchUserPost = ({ id, params }) =>
  request.get(`${endPoints.POST}/${id}`, { params });
