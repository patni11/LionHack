import { followListInfoQuery } from "@/utils/query";
import { FollowListInfoResp, SearchUserInfoResp, Network } from "@/utils/types";

const axios = require("axios");

const NAME_SPACE = "CyberConnect";
const NETWORK = Network.ETH;
const FIRST = 10; // The number of users in followings/followers list for each fetch

let result: Array<NFTTransactionInterface> = [];

const addressTransactions = async (address: any, txType: any) => {
  let action;
  if (txType === "normal") {
    action = "txlist";
  } else if (txType === "erc20") {
    action = "tokentx";
  } else if (txType === "erc721") {
    action = "tokennfttx";
  }

  return axios
    .get("https://api.etherscan.io/api", {
      params: {
        module: "account",
        action: action,
        address: address,
        startblock: 11000000,
        endblock: 15000000,
        page: 1,
        offset: 2,
        sort: "desc",
        apikey: "E3751TVH3232H68PKRKM6EHFQNCPGUS8HI",
      },
    })
    .then(function(response: any) {
      response?.data?.result?.forEach((el: any) => {
        result.push({
          timeStamp: el.timeStamp,
          from: el.from,
          to: el.to,
          tokenID: el.tokenID,
          tokenName: el.tokenName,
          tokenSymbol: el.tokenSymbol,
          tokenDecimal: el.tokenDecimal,
        });
      });
    })
    .catch(function(error: any) {
      // handle error
      console.log(error);
    });
};

interface FollowingListRespInterface {
  address: string;
  avatar?: string;
  domain?: string;
}

export interface NFTTransactionInterface {
  from: string;
  timeStamp: string;
  to: string;
  tokenDecimal: string;
  tokenID: string;
  tokenName: string;
  tokenSymbol: string;
}

const getUserFeed = async (userAddress: any) => {
  const response = await followListInfoQuery({
    address: userAddress,
    namespace: NAME_SPACE,
    network: NETWORK,
    followingFirst: FIRST,
    followerFirst: FIRST,
  });

  const followingList = response?.followings?.list;
  const tree = followingList.map(
    async (following: FollowingListRespInterface) =>
      await addressTransactions(following.address, "erc721")
  );

  await Promise.all(tree);

  result.sort(function(a: any, b: any) {
    return parseInt(b.timeStamp) - parseInt(a.timeStamp);
  });

  return result;
};

export { addressTransactions, getUserFeed };
