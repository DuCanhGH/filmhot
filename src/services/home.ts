import axios from "../shared/axios";
import { HomeSection, TopSearched } from "../shared/types";

export const getHome = async (page = 0): Promise<HomeSection[]> => {
  try {
    const data = (
      await axios.get("homePage/getHome", {
        params: {
          page,
        },
      })
    ).data.data.recommendItems.filter(
      (section: any) => section.homeSectionType !== "BLOCK_GROUP"
    );
    if (!data) {
      return [];
    }
    return data;
  } catch (error) {
    return [];
  }
};

export const getTopSearched = async (): Promise<TopSearched[]> =>
  (await axios.get("search/v1/searchLeaderboard")).data.data.list;
