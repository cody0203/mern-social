import { request, endPoints } from "../../../request";
import { getErrorMessage } from "../../util";

const signUp = async (params) => {
  try {
    const { data } = await request.post(endPoints.USERS, params);
    return data;
  } catch (error) {
    console.log(error.response);
    throw getErrorMessage(error);
  }
};

export default signUp;
