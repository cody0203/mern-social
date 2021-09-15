import request from "../../request/connect";
import * as endPoints from "../../request/end-point";

export const createComment = ({ id, params }) =>
  request.post(`${endPoints.COMMENT}/${id}`, params);

export const likeComment = (id) =>
  request.put(`${endPoints.COMMENT}/like/${id}`);

export const deleteComment = (id) =>
  request.delete(`${endPoints.COMMENT}/${id}`);

export const editComment = ({ id, params }) =>
  request.put(`${endPoints.COMMENT}/${id}`, params);

export const createReply = ({ id, params }) =>
  request.post(`${endPoints.REPLY}/${id}`, params);

export const deleteReply = (id) => request.delete(`${endPoints.REPLY}/${id}`);
