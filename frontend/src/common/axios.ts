import defaultAxios, { AxiosRequestConfig } from 'axios';
import { Auth } from 'aws-amplify';

const axios = defaultAxios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
});

const requestHandler = async (request: AxiosRequestConfig) => {
  const session = await Auth.currentSession();
  const accessToken = session.getAccessToken();
  request.headers.Authorization = `Bearer ${accessToken.getJwtToken()}`;

  return request;
};

axios.interceptors.request.use(request => requestHandler(request));

export default axios;
