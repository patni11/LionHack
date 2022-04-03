import React, { useState, useEffect } from "react";
import style from "./ActivityFeed.module.css";
import Feed from "./feed";
import { formatAddress } from "@/utils/helper";
import { getUserFeed, NFTTransactionInterface } from "./getFeedData";
import { BasicUserInfo, FollowListInfoResp } from "@/utils/types";

interface ActivityFeedInterface {
  address: string;
  following: FollowListInfoResp | null;
}
function ActivityFeed({ address, following }: ActivityFeedInterface) {
  const [feedData, setFeedData] = useState<NFTTransactionInterface[]>([]);
  // const [ensStrings, setEnsStrings] = useState<string[]>([]);
  useEffect(() => {
    const fetchUserFeed = async () => {
      const data: NFTTransactionInterface[] = await getUserFeed(address);
      // const allEns: string[] = [];
      // const mapRes: any = data.map(async (feed) => {
      //   const ens = await clean_address(feed.from);
      //   allEns.push(ens);
      // });
      // await Promise.all(mapRes);
      // setEnsStrings(allEns);
      setFeedData(data);
    };
    fetchUserFeed();
  }, [setFeedData]);

  return (
    <div className={style.ActivityFeed}>
      {feedData.map((feed, i) => {
        const user = following?.followings.list.filter(
          (i) => i.address === feed.from || feed.to
        )[0];
        const user_name = user?.domain || user?.address;
        let trade_type = "";
        if (user?.address === feed.from) {
          trade_type = "sold";
        } else {
          trade_type = "bought";
        }

        return (
          <Feed
            img="/fff.png"
            address={user_name}
            activity_type={feed.type}
            activity_title={`${user_name} ${trade_type} ${feed.tokenSymbol}`}
            activity_description={`${formatAddress(feed.from)} ${trade_type} ${
              feed.tokenSymbol
            } ${feed.tokenID} of collection ${feed.tokenName} for 100ETH`}
            date={feed.timeStamp}
            key={feed.from}
          ></Feed>
        );
      })}
    </div>
  );
}

export default ActivityFeed;

// timeStamp: el.timeStamp,
// from: el.from,
// to: el.to,
// tokenID: el.tokenID,
// tokenName: el.tokenName,
// tokenSymbol: el.tokenSymbol,
// tokenDecimal: el.tokenDecimal,
// type: txType,
