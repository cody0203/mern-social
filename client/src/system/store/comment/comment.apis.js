import request from "../../request/connect";
import * as endPoints from "../../request/end-point";

export const createComment = ({ id, params }) =>
  request.post(`${endPoints.COMMENT}/${id}`, params);
