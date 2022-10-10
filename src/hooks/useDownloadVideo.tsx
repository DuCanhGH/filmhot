import { useState } from "react";

import { getInfo } from "../services/download-movie";

export const useDownloadVideo = (url: string) => {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<any>(null);
  const [segments, setSegments] = useState([]);
  const [playListSource, setPlayListSource] = useState([]);
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
            const { data } = await getInfo(new URL(playlist.uri, url.trim()).href);
            return data.segments.map(
              (segment: any) => new URL(segment.uri, new URL(playlist.uri, url.trim()).href).href,
            );
          }),
        );
        setPlayListSource(result as any);
      } else {
        setSegments(data?.segments.map((segment: any) => new URL(segment.uri, url.trim()).href));
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
