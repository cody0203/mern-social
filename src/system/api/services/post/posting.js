import { endPoints, request } from "../../../request";

import { getErrorMessage } from "../../util";

const posting = async ({ params }) => {
  try {
    const response = await request.post(endPoints.POST, params);
    const { data } = response.data;
    return data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export default posting;
