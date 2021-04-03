import defaultAxios, { AxiosRequestConfig } from 'axios';
import { Auth } from 'aws-amplify';

const axios = defaultAxios.create({
  baseURL: `https://localhost:5001`
});

const requestHandler = async (request: AxiosRequestConfig) => {
  const session = await Auth.currentSession();
  const accessToken = session.getAccessToken();
  request.headers.Authorization = `Bearer ${accessToken.getJwtToken()}`;

  return request;
};

axios.interceptors.request.use(request => requestHandler(request));

export default axios;
