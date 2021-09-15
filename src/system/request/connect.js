import config from "../../config/config";
import requestFactory, { HTTP_STATUS } from "./request";

const request = requestFactory(config.server, {
  commonHeaders: { Accept: "application/json" },

  interReq: async (config) => {
    config.headers["Access-Control-Allow-Headers"] = "Authorization";
    config.headers["Access-Control-Allow-Origin"] = "*";
  },

  interErr: (error) => {
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  },
});

export default request;
