export interface HomeSection {
  bannerProportion?: any;
  coverType?: any;
  homeSectionId: number;
  homeSectionName: string;
  homeSectionType: string;
  recommendContentVOList: {
    contentType: string;
    id: number;
    imageUrl: string;
    jumpAddress: string;
    jumpType: string;
    needLogin: boolean;
    resourceNum?: any;
    resourceStatus?: any;
    showMark: boolean;
    title: string;
  }[];
  refId?: any;
  refRedirectUrl: string;
}

export interface TopSearched {
  cover: string;
  domainType: number;
  id: string;
  title: string;
}

export interface DetailType {
  category: number;
  coverVerticalUrl: string;
  episodeVo: number;
  id: string;
  introduction: string;
  likeList: {
    category: number;
    coverVerticalUrl: string;
    id: string;
    name: string;
    score: number;
  }[];
  name: string;
  refList: {
    category: number;
    coverVerticalUrl: string;
    id: string;
    name: string;
  }[];
  score: number;
  tagList: {
    id: number;
    name: string;
  }[];
  year: number;
}

export interface SearchResultItem {
  areas: {
    id: number;
    name: string;
  }[];
  categoryTag: {
    id: number;
    name: string;
  }[];
  coverHorizontalUrl: string;
  coverVerticalUrl: string;
  domainType: number;
  dramaType: {
    code: string;
    name: string;
  };
  duration: string;
  id: string;
  name: string;
  releaseTime: string;
  sort: string;
  upInfo: {
    enable: boolean;
    upId: number;
    upImgUrl: string;
    upName: string;
  };
}

export interface ScreeningItems extends Record<string, any> {
  id?: number;
  items: {
    name: string;
    params: string;
    screeningType: keyof ScreeningItems;
  }[];
  name: string;
}

export interface SearchConfig {
  id: number;
  name: string;
  params: string;
  screeningItems: ScreeningItems[];
}

export interface User {
  uid: string;
  email: string;
  photoURL: string;
  displayName: string;
}

export interface CommentType {
  user: User;
  value: string;
  reactions: {
    [key: string]: number;
  };
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
}

export interface DiscoveryItem {
  category: number;
  coverHorizontalUrl: string;
  coverVerticalUrl: string;
  duration: number;
  id: string;
  introduction: string;
  like: boolean;
  likeCount: number;
  mediaInfo: {
    definitionList: {
      code: string;
      description: string;
      fullDescription: string;
    }[];
    id: number;
    resourceType: number;
    subtitlingList: any[];
  };
  name: string;
  refList: {
    category: number;
    coverHorizontalUrl: string;
    coverVerticalUrl: string;
    drameTypeVo: {
      drameName: string;
      drameType: string;
    };
    id: string;
    name: string;
    score: number;
    tagList: {
      id: number;
      name: string;
    }[];
    year: number;
  }[];
  upInfo: {
    enable: boolean;
    upId: number;
    upImgUrl: string;
    upName: string;
  };

  mediaUrl: string;
}

export interface AdvanceSearchItem {
  coverVerticalUrl: string;
  domainType: number;
  id: string;
  name: string;
  sort: string;
}

export interface HistoryType {
  id: string;
  name: string;
  coverVerticalUrl: string;
  category: number;
}

export interface BookmarkType {
  id: string;
  name: string;
  coverVerticalUrl: string;
  category: number;
}

export interface M3U8Manifest {
  allowCache: boolean;
  endList: boolean;
  mediaSequence: number;
  discontinuitySequence: number;
  playlistType: string;
  custom: Record<string, never>;
  playlists: {
    uri: string;
    attributes: Record<string, string | string[]>;
  }[];
  mediaGroups: {
    AUDIO: {
      "GROUP-ID": {
        NAME: {
          default: boolean;
          autoselect: boolean;
          language: string;
          uri: string;
          instreamId: string;
          characteristics: string;
          forced: boolean;
        };
      };
    };
    VIDEO: Record<string, never>;
    "CLOSED-CAPTIONS": Record<string, never>;
    SUBTITLES: Record<string, never>;
  };
  dateTimeString: string;
  dateTimeObject: Date;
  targetDuration: number;
  totalDuration: number;
  discontinuityStarts: [number];
  segments: {
    byterange: {
      length: number;
      offset: number;
    };
    duration: number;
    attributes: Record<string, never>;
    discontinuity: number;
    uri: string;
    timeline: number;
    key: {
      method: string;
      uri: string;
      iv: string;
    };
    map: {
      uri: string;
      byterange: {
        length: number;
        offset: number;
      };
    };
    "cue-out": string;
    "cue-out-cont": string;
    "cue-in": string;
    custom: Record<string, never>;
  }[];
}
