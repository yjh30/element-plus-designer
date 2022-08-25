import axios from 'axios';

const instance = axios.create({
  baseURL: '/mock/12/api',
  timeout: 1000,
  headers: {

  },
  transformResponse: [
    function(data) {
      try {
        return JSON.parse(data);
      } catch(_err) {
        return data;
      }
    }
  ]
});

instance.interceptors.response.use(
  res => {
    const { status, data } = res || {};
    if (status === 200) {
      return data;
    }
    return res;
  }
)

export default instance;
