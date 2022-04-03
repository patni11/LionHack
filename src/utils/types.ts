export interface FollowListInfoArgs {
  address: string;
  namespace?: string;
  network?: string;
  followingFirst?: number;
  followingAfter?: string;
  followerFirst?: number;
  followerAfter?: string;
}

export interface SearchUserInfoArgs {
  fromAddr: string;
  toAddr: string;
  network?: string;
}

export interface RecommendationInfoArgs {
  address : string;
  filter? : Filter;
  network? : Network;
  first? : number;
  after? : string;
}

export interface BasicRecommendationInfo {
  address : string;
  domain : string;
  avatar : string;
  reccomendationReason : string;
  followerCount : number;
}

export interface BasicUserInfo {
  domain: string;
  address: string;
  avatar: string;
}

export interface FollowListInfo {
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
  };
  list: BasicUserInfo[];
}

export interface RecommendationListInfo {
  pageInfo : {
    startCursor : string;
    endCursor : string;
    hasNextPage : boolean;
    hasPreviousPage : boolean;
  }
  list : BasicRecommendationInfo[];
}

export interface FollowListInfoResp {
  followingCount: number;
  followerCount: number;
  followings: FollowListInfo;
  followers: FollowListInfo;
}

export interface SearchUserInfoResp {
  connections: {
    followStatus: {
      isFollowing: boolean;
      isFollowed: boolean;
    };
  }[];
  identity: {
    domain: string;
    address: string;
    avatar: string;
  };
}

export interface RecommendationResp {
  result: string;
  data : RecommendationListInfo;
}

export enum Network {
  ETH = "ETH",
  SOLANA = "SOLANA",
}

export enum Filter {
  SOCIAL = "SOCIAL"
}
