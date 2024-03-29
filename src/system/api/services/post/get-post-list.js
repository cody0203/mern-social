import get from "lodash/get";
import { request, endPoints } from "../../../request";
import { getErrorMessage } from "../../util";

const getPostList = async (params) => {
  try {
    const id = get(params, "id");
    const page = get(params, "page");

    const endPoint = id ? `${endPoints.POST}/${id}` : endPoints.POSTS;
    const { data } = await request.get(endPoint, { params: { page } });
    const postList = get(data, "data");
    const currentPage = get(data, "meta.current_page");
    const totalPage = get(data, "meta.total_page");
    return {
      data: postList,
      currentPage,
      totalPage,
    };
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export default getPostList;
