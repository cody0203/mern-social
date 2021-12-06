import { request, endPoints } from "../../../request";
import { getErrorMessage } from "../../util";

const getUserById = async (id) => {
  try {
    const { data } = await request.get(`${endPoints.USER}/${id}`);
    return data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export default getUserById;
