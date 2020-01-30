import axios from "axios";
import { YOUTUBE_API_URL, YOUTUBE_API_KEY } from "./settings";

const instance = axios.create({
  baseURL: YOUTUBE_API_URL
});

instance.interceptors.request.use(config => {
  config.params = {
    part: "snippet",
    type: "video",
    maxResults: 10,
    key: YOUTUBE_API_KEY,
    ...config.params
  };
  return config;
});

export default instance;
