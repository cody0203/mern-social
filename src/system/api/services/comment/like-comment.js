import { request, endPoints } from "../../../request";
import { getErrorMessage } from "../../util";

const likeComment = async (id) => {
  try {
    const response = await request.put(`${endPoints.COMMENT}/like/${id}`);
    const { data } = response.data;
    return data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export default likeComment;
