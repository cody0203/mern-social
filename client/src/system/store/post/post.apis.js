import request from "../../request/connect";
import * as endPoints from "../../request/end-point";

export const fetchPostList = () => request.get(endPoints.POSTS);

export const createPost = (params) => request.post(endPoints.POST, params);
