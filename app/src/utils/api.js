import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
const apiUrl = 'https://backend-profilenode.herokuapp.com/';

const callAPI = async (method, baseUrl = null, route, data = null) => {
  let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };
  let url = `${baseUrl || apiUrl}${route}`;

  let config = {
    timeout: 1000 * 120,
    method,
    headers,
    url,
    crossDomain: true,
    data,
  };

  try {
    let state = await NetInfo.fetch();
    let response = null;
    if (state.isInternetReachable) {
      response = await axios(config);
    }
    return response;
  } catch (error) {
    throw error;
  }
};
export default {
  post: async ({baseUrl = null, route, data = null}) =>
    callAPI('post', baseUrl, route, data),
  put: async ({baseUrl = null, route, data = null}) =>
    callAPI('put', baseUrl, route, data),
  patch: async ({baseUrl = null, route, data = null}) =>
    callAPI('patch', baseUrl, route, data),
  delete: async ({baseUrl = null, route, data = null}) =>
    callAPI('delete', baseUrl, route, data),
  get: async ({baseUrl = null, route}) => callAPI('get', baseUrl, route, null),
  head: async ({baseUrl = null, route}) =>
    callAPI('head', baseUrl, route, null),
};
