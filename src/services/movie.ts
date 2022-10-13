import axios from "@/shared/axios";
import { BANNED_IDS } from "@/shared/constants";
import type { DetailType } from "@/shared/types";

type OgDetailType = Omit<DetailType, "episodeVo"> & {
  episodeVo: {
    id: string;
    definitionList: {
      code: string;
      description: string;
    }[];
    subtitlingList: {
      language: string;
      subtitlingUrl: string;
      translateType: string;
      languageAbbr: string;
    }[];
  }[];
};

interface SubtitlesType {
  language: string;
  url: string;
  lang: string;
}

export const getMovieDetail = async (
  id: string,
  category: 0 | 1,
  episodeIndex = 1
): Promise<{
  data: DetailType;
  sources: { quality: number; url: string }[];
  subtitles: { language: string; url: string; lang: string }[];
}> => {
  if (typeof id !== "string") {
    throw new Error("ID is not string.");
  }
  if (BANNED_IDS.includes(+id)) {
    throw new Error("Banned movie/tv series.");
  }
  const data = (
    await axios.get<{
      data: OgDetailType;
    }>("movieDrama/get", {
      params: {
        id,
        category,
      },
    })
  ).data.data;

  const sources = (
    await Promise.all(
      data.episodeVo[episodeIndex - 1].definitionList.map(
        async (quality) =>
          (
            await axios.get("media/previewInfo", {
              params: {
                category,
                contentId: id,
                episodeId: data.episodeVo[episodeIndex - 1].id,
                definition: quality.code,
              },
            })
          ).data.data.mediaUrl
      )
    )
  )
    .map((url, index) => ({
      quality: Number(
        data.episodeVo[episodeIndex - 1].definitionList[index].description
          .toLowerCase()
          .replace("p", "")
      ),
      url,
    }))
    .sort((a, b) => b.quality - a.quality);

  if (sources.some((item) => item.url.startsWith("http:"))) {
    return await getMovieDetail(id, category, episodeIndex);
  }

  const subtitles = data.episodeVo[episodeIndex - 1].subtitlingList
    .map((sub) => ({
      language: `${sub.language}${sub.translateType ? " (Auto)" : ""}`,
      url: sub.subtitlingUrl,
      lang: sub.languageAbbr,
    }))
    .reduce((acc, element) => {
      if (element.lang === "en") {
        return [element, ...acc];
      }
      return [...acc, element];
    }, [] as SubtitlesType[])
    .reduce((acc, element) => {
      if (element.lang === "vi") {
        return [element, ...acc];
      }
      return [...acc, element];
    }, [] as SubtitlesType[]);
  const {
    id: returnId,
    tagList,
    category: returnCategory,
    coverVerticalUrl,
    name,
    score,
    year,
    introduction,
    episodeVo,
    refList,
    likeList,
  } = data;
  return {
    data: {
      id: returnId,
      tagList,
      category: returnCategory,
      coverVerticalUrl,
      name,
      score,
      year,
      introduction,
      episodeVo: episodeVo.length,
      refList: refList.map((list) => {
        const { category, coverVerticalUrl, id, name } = list;
        return { category, coverVerticalUrl, id, name };
      }),
      likeList: likeList.map((list) => {
        const { category, coverVerticalUrl, id, name, score } = list;
        return {
          category,
          coverVerticalUrl,
          id,
          name,
          score,
        };
      }),
    },
    sources,
    subtitles,
  };
};
