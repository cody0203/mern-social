import request from "../../request/connect";
import * as endPoints from "../../request/end-point";

export const fetchPostList = () => request.get(endPoints.POSTS);

export const createPost = ({ params }) => request.post(endPoints.POST, params);

export const updatePost = ({ id, params }) =>
  request.put(`${endPoints.POST}/${id}`, params);
