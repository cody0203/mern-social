import { request, endPoints } from "../../../request";
import { getErrorMessage } from "../../util";

const editComment = async ({ id, params }) => {
  try {
    const response = await request.put(`${endPoints.COMMENT}/${id}`, params);
    const { data } = response.data;

    return data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export default editComment;
