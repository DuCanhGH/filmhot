import { HomeSection, TopSearched } from "../shared/types";

import axios from "../shared/axios";

export const getHome = async (page = 0): Promise<HomeSection[]> =>
  (
    await axios.get("homePage/getHome", {
      params: {
        page,
      },
    })
  ).data.data.recommendItems.filter((item: { bannerProportion: number }) => !item.bannerProportion);

export const getTopSearched = async (): Promise<TopSearched[]> =>
  (await axios.get("search/v1/searchLeaderboard")).data.data.list;
