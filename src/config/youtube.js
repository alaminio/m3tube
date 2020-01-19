import axios from "axios";
import { M3TUBE_KEY, M3TUBE_URL } from "./constants";

const instance = axios.create({
  baseURL: M3TUBE_URL
});

instance.interceptors.request.use(config => {
  config.params = {
    part: "snippet",
    maxResults: 10,
    key: M3TUBE_KEY,
    ...config.params
  };
  return config;
});

export default instance;
