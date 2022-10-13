export const convertWebp = (url: string) =>
  `https://images.weserv.nl/?url=${encodeURIComponent(url)}&output=webp`;

export const resizeImage = (url: string, width = "", height = "") =>
  url.startsWith("https://graph.facebook.com/")
    ? url
    : `https://images.weserv.nl/?url=${encodeURIComponent(
        url
      )}&w=${width}&h=${height}&fit=outside&output=webp`;

export const subtitleProxy = (url: string) =>
  `/api/subtitles?url=${encodeURIComponent(url)}`;

export const urlWithProxy = (url: string) =>
  `https://corsproxy.io/?${encodeURIComponent(url)}`;

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

export const BANNED_IDS: number[] = [23842];
