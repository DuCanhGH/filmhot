import { useState } from "react";

import { getInfo } from "@/services/download-movie";
import { M3U8Manifest } from "@/shared/types";

export const useDownloadVideo = (url: string) => {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<M3U8Manifest | null>(null);
  const [segments, setSegments] = useState<string[]>([]);
  const [playListSource, setPlayListSource] = useState<string[][]>([]);
  const [proxy, setProxy] = useState(false);
  const downloadVideo = async () => {
    setDisabled(true);
    setLoading(true);
    setError(false);
    try {
      const { data, isUseProxy } = await getInfo(url.trim());
      setProxy(isUseProxy);
      console.log(data);
      if (data?.playlists?.length) {
        const result = await Promise.all(
          data.playlists.map(async (playlist: any) => {
            const { data } = await getInfo(
              new URL(playlist.uri, url.trim()).href
            );
            return data.segments.map(
              (segment) =>
                new URL(segment.uri, new URL(playlist.uri, url.trim()).href)
                  .href
            );
          })
        );
        setPlayListSource(result);
      } else {
        setSegments(
          data?.segments.map((segment) => new URL(segment.uri, url.trim()).href)
        );
      }
      setData(data);
      setLoading(false);
      setDisabled(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
      setDisabled(false);
    }
  };
  return {
    disabled,
    loading,
    setLoading,
    error,
    setError,
    data,
    setData,
    segments,
    setSegments,
    playListSource,
    setPlayListSource,
    proxy,
    setProxy,
    downloadVideo,
  };
};
