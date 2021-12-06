import { request, endPoints } from "../../../request";
import { getErrorMessage } from "../../util";

const reactionPost = async (id) => {
  try {
    const response = await request.put(`${endPoints.POST}/like/${id}`);
    const { data } = response.data;

    return data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export default reactionPost;
