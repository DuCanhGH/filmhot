import axios from "axios";

import { apiUrl, urlWithProxy } from "../shared/constants";

export const getInfo = async (url: string) => {
  let isUseProxy = false;
  const { data } = await axios
    .get(`${apiUrl}/info?url=${encodeURIComponent(url)}`)
    .catch(async () => {
      isUseProxy = true;
      const { data } = await axios.get(
        `${apiUrl}/info?url=${encodeURIComponent(urlWithProxy(url))}`,
      );
      return { data };
    });
  return { data, isUseProxy };
};
