import { request, endPoints } from "../../../request";
import { getErrorMessage } from "../../util";

const updatePost = async (id, params) => {
  try {
    const response = await request.put(`${endPoints.POST}/${id}`, params);
    const { data } = response.data;
    return data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export default updatePost;
