import React, { useState, useEffect } from "react";
import style from "./ActivityFeed.module.css";
import Feed from "./feed";
import { ethers } from "ethers";
import { getUserFeed, NFTTransactionInterface } from "./getFeedData";
import detectEthereumProvider from "@metamask/detect-provider";

interface ActivityFeedInterface {
  address: string;
}
function ActivityFeed({ address }: ActivityFeedInterface) {
  const [feedData, setFeedData] = useState<NFTTransactionInterface[]>([]);
  const [ensStrings, setEnsStrings] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserFeed = async () => {
      const data: NFTTransactionInterface[] = await getUserFeed(address);
      const allEns: string[] = [];
      const mapRes: any = data.map(async (feed) => {
        const ens = await clean_address(feed.from);
        allEns.push(ens);
      });
      await Promise.all(mapRes);
      setEnsStrings(allEns);
      console.log(data);
      setFeedData(data);
    };
    fetchUserFeed();
  }, [setFeedData]);

  return (
    <div className={style.ActivityFeed}>
      {console.log(feedData)}
      {feedData.map((feed, i) => {
        return (
          <Feed
            img="/fff.png"
            address={ensStrings[i]}
            activity_type={feed.tokenID}
            activity_title={feed.tokenName}
            activity_description={feed.tokenSymbol}
            date={feed.timeStamp}
            key={feed.from}
          ></Feed>
        );
      })}
    </div>
  );
}

const clean_address = async (address: string) => {
  const provider: any = await detectEthereumProvider();
  let name: string = "sadfasdfs";
  name = await provider.lookupAddress(address);
  return name;
};

export default ActivityFeed;
