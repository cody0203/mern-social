import { request, endPoints } from "../../../request";
import { getErrorMessage } from "../../util";

const deletePost = async (id) => {
  try {
    const { data } = await request.delete(`${endPoints.POST}/${id}`);
    return data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export default deletePost;
