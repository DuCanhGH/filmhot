export const apiUrl = import.meta.env.PROD
  ? "https://ducanh-filmhot-api.vercel.app/api"
  : `http://localhost:${import.meta.env.VITE_API_PORT}/api`;

export const convertWebp = (url: string) =>
  `https://images.weserv.nl/?url=${encodeURIComponent(url)}&output=webp`;

export const resizeImage = (url: string, width = "", height = "") =>
  url.startsWith("https://graph.facebook.com/")
    ? url
    : `https://images.weserv.nl/?url=${encodeURIComponent(
        url,
      )}&w=${width}&h=${height}&fit=outside&output=webp`;

export const subtitleProxy = (url: string) => `${apiUrl}/subtitles?url=${encodeURIComponent(url)}`;

export const IMAGE_CARD_SIZE: {
  [key: number]: {
    width: number;
    height: number;
  };
} = {
  0: {
    width: 200,
    height: 100,
  },
  1: {
    width: 175,
    height: 246,
  },
};
