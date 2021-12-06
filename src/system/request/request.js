import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const REQUEST = {
  REQUEST: "REQUEST.REQUEST",
  SUCCESS: "REQUEST.SUCCESS",
  ERROR: "REQUEST.ERROR",
  CANCEL: "REQUEST.CANCEL",
};

export const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNAUTHENTICATED: 401,
  UNAUTHORIZED: 403,
  GEN_UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_TEMPORARILY_OVERLOADED: 502,
  SERVICE_UNAVAILABLE: 503,
  CONFLICT: 409,
  TOO_MANY_REQUEST: 429,
};

class Request {
  cancels = {};

  constructor(baseURL, hooks) {
    this.baseURL = baseURL;
    this.hooks = hooks;
  }

  make() {
    const request = axios.create({ baseURL: this.baseURL, timeout: 50000 });

    const { commonHeaders, interReq, interRes, interCancel } = this.hooks;

    if (commonHeaders) {
      Object.keys(commonHeaders).forEach((headerKey) => {
        request.defaults.headers.common[headerKey] = commonHeaders[headerKey];
      });
    }

    request.interceptors.request.use(
      async (config) => {
        const accessToken = cookies.get("t");
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    request.interceptors.request.use(
      (config) => {
        const cancelToken = axios.CancelToken.source();
        config.cancelToken = cancelToken.token;

        const key = `${config.method}::${config.url}`;
        if (this.cancels[key]) {
          this.cancels[key]();
        }
        this.cancels[key] = cancelToken.cancel;

        interReq && interReq(config);

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    request.interceptors.response.use(
      (response) => {
        interRes && interRes(response);

        return response;
      },
      (error) => {
        if (!axios.isCancel(error)) {
          return Promise.reject(error);
        }

        return interCancel && interCancel(error);
      }
    );

    return request;
  }
}

export default function (baseUrl, hooks) {
  return new Request(baseUrl, hooks).make();
}
