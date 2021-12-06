import get from "lodash/get";

const getErrorMessage = (error) =>
  get(error, "response.data.error") ||
  get(error, "response.data.message") ||
  get(error, "message");

export default getErrorMessage;
