export const resizeImage = (url: string, width = "", height = "") =>
  url.startsWith("https://graph.facebook.com/")
    ? url
    : `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=${width}&h=${height}&fit=outside`;

export const subtitleProxy = (url: string) =>
  `https://ducanh-filmhot-api.vercel.app/api/subtitles?url=${encodeURIComponent(url)}`;

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
