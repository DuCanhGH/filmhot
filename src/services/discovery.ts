import axios from "@/shared/axios";
import { DiscoveryItem } from "@/shared/types";

interface VideoRecommendPoolDataType {
  id: string;
  category: string;
  mediaInfo: {
    id: string;
    definitionList: {
      code: string;
    }[];
  };
}

export const getDiscoveryItems = async (page = 0): Promise<DiscoveryItem[]> => {
  const data = (
    await axios.get<{
      data: VideoRecommendPoolDataType[];
    }>("recommendPool/getVideoFromRecommondPool", {
      params: {
        page,
      },
      headers: { deviceid: Math.random().toString(36).slice(-8) },
    })
  ).data.data;

  const sources = (
    await axios.post(
      "media/bathGetplayInfo",
      data.map((item) => ({
        category: item.category,
        contentId: item.id,
        episodeId: item.mediaInfo.id,
        definition: item.mediaInfo.definitionList.slice(-1)[0].code,
      }))
    )
  ).data.data.map((item: any) => item.mediaUrl);

  return data.map((item: any, index: number) => ({
    ...item,
    mediaUrl: sources[index],
  }));
};
