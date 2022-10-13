import axios from "@/shared/axios";
import type { AdvanceSearchItem, SearchConfig } from "@/shared/types";

export const getSearchConfig = async (): Promise<SearchConfig[]> =>
  (
    await axios.get<{
      data: SearchConfig[];
    }>("search/list")
  ).data.data.map((config) => ({
    id: config.id,
    name: config.name,
    params: config.params,
    screeningItems: config.screeningItems.map((s_item) => ({
      id: s_item.id,
      items: s_item.items.map((item) => ({
        name: item.name,
        params: item.params,
        screeningType: item.screeningType,
      })),
      name: s_item.name,
    })),
  }));

export const advanceSearch = async (
  params: string,
  configs: Record<string, any>,
  sort: string
): Promise<AdvanceSearchItem[]> =>
  (
    await axios.post("search/v1/search", {
      size: 20,
      params,
      ...configs,
      sort,
    })
  ).data.data.searchResults;
