import request from "../../request/connect";
import * as endPoints from "../../request/end-point";

export const signIn = (params) => request.post(endPoints.SIGN_IN, params);

export const fetchUserInfo = () => request.get(endPoints.USER_INFO);
