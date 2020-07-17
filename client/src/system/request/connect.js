import requestFactory, { HTTP_STATUS } from './request';

const apiUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/'
    : 'https://evening-brook-56461.herokuapp.com';

const request = requestFactory(apiUrl, {
  commonHeaders: { Accept: 'application/json' },

  interReq: async (config) => {
    config.headers['Access-Control-Allow-Headers'] = 'Authorization';
    config.headers['Access-Control-Allow-Origin'] = '*';
  },

  interErr: (error) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }
  },
});

export default request;
