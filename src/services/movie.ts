import axios from "../shared/axios";
import { DetailType } from "../shared/types";

export const getMovieDetail = async (
  id: string,
  category: 0 | 1,
  episodeIndex = 1,
): Promise<{
  data: DetailType;
  sources: { quality: number; url: string }[];
  subtitles: { language: string; url: string; lang: string }[];
}> => {
  const data = (
    await axios.get("movieDrama/get", {
      params: {
        id,
        category,
      },
    })
  ).data.data;

  const sources = (
    await Promise.all(
      data.episodeVo[episodeIndex - 1].definitionList.map(
        async (quality: any) =>
          (
            await axios.get("media/previewInfo", {
              params: {
                category,
                contentId: id,
                episodeId: data.episodeVo[episodeIndex - 1].id,
                definition: quality.code,
              },
            })
          ).data.data.mediaUrl,
      ),
    )
  )
    .map((url, index) => ({
      quality: Number(
        data.episodeVo[episodeIndex - 1].definitionList[index].description
          .toLowerCase()
          .replace("p", ""),
      ),
      url,
    }))
    .sort((a, b) => b.quality - a.quality);

  if (sources.some((item) => item.url.startsWith("http:"))) {
    return await getMovieDetail(id, category, episodeIndex);
  }

  const subtitles = data.episodeVo[episodeIndex - 1].subtitlingList
    .map((sub: any) => ({
      language: `${sub.language}${sub.translateType ? " (Auto)" : ""}`,
      url: sub.subtitlingUrl,
      lang: sub.languageAbbr,
    }))
    .reduce((acc: any, element: any) => {
      if (element.lang === "en") {
        return [element, ...acc];
      }
      return [...acc, element];
    }, [])
    .reduce((acc: any, element: any) => {
      if (element.lang === "vi") {
        return [element, ...acc];
      }
      return [...acc, element];
    }, []);

  return {
    data: {
      ...data,
      episodeVo: data.episodeVo.length,
    },
    sources,
    subtitles,
  };
};
