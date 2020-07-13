import request from "../../request/connect";
import * as endPoints from "../../request/end-point";

export const createComment = ({ id, params }) =>
  request.post(`${endPoints.COMMENT}/${id}`, params);

export const likeComment = (id) =>
  request.put(`${endPoints.COMMENT}/like/${id}`);

export const createReply = ({ id, params }) =>
  request.post(`${endPoints.REPLY}/${id}`, params);
