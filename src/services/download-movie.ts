import axios from "axios";

import { urlWithProxy } from "@/shared/constants";
import { M3U8Manifest } from "@/shared/types";

export const getInfo = async (url: string) => {
  let isUseProxy = false;
  const { data } = await axios
    .get<M3U8Manifest>(`/api/parse-m3u8?url=${encodeURIComponent(url)}`)
    .catch(async () => {
      isUseProxy = true;
      const { data } = await axios.get<M3U8Manifest>(
        `/api/parse-m3u8?url=${encodeURIComponent(urlWithProxy(url))}`
      );
      return { data };
    });
  return { data, isUseProxy };
};
