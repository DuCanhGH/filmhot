export const apiUrl = "https://ducanh-filmhot-api.vercel.app/api";

export const convertWebp = (url: string) => `${apiUrl}/webp?url=${encodeURIComponent(url)}`;

export const resizeImage = (url: string, width = "", height = "") =>
  url.startsWith("https://graph.facebook.com/")
    ? url
    : `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=${width}&h=${height}&fit=outside`;

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
