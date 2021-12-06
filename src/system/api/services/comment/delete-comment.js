import { request, endPoints } from "../../../request";
import { getErrorMessage } from "../../util";

const deleteComment = async (id) => {
  try {
    const response = await request.delete(`${endPoints.COMMENT}/${id}`);
    const { data } = response.data;

    return data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export default deleteComment;
