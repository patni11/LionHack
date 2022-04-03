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
      {feedData.map((feed) => {
        console.log(feed);
        console.log(following?.followings.list);
        let user = following?.followings.list.find((filter_user) => {
          if (
            filter_user.address == feed.from ||
            filter_user.address == feed.to
          ) {
            return filter_user;
          }
        });

        const user_name = user?.domain || formatAddress(feed.from);
        let trade_type = "";
        if (user?.address === feed.from) {
          trade_type = "sold";
        } else {
          trade_type = "bought";
        }

        let feed_type = "";
        if (feed.type === "erc721" || "erc1155") {
          feed_type = "NFT";
        }

        let link = "https://etherscan.io/tx/" + feed.txHash;

        const date = new Date(parseInt(feed.timeStamp) * 1000);
        const ago = timeAgo(date);
        return (
          <Feed
            img={user?.avatar || "/fff.png"}
            address={user_name}
            activity_type={feed_type}
            activity_title={`${user_name} ${trade_type} ${feed.tokenSymbol}`}
            activity_description={`${user_name} ${trade_type} ${feed.tokenSymbol} #${feed.tokenID} of collection ${feed.tokenName}`}
            date={ago}
            key={feed.txHash}
            link={link}
          ></Feed>
        );
      })}
    </div>
  );
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getFormattedDate(date: any, prefomattedDate = "", hideYear = false) {
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    // Adding leading zero to minutes
    minutes = `0${minutes}`;
  }

  if (prefomattedDate) {
    // Today at 10:20
    // Yesterday at 10:20
    return `${prefomattedDate} at ${hours}:${minutes}`;
  }

  if (hideYear) {
    // 10. January at 10:20
    return `${day}. ${month}`;
  }

  // 10. January 2017. at 10:20
  return `${day}. ${month} ${year}`;
}

// --- Main function
function timeAgo(dateParam: any) {
  if (!dateParam) {
    return "null";
  }

  const date = typeof dateParam === "object" ? dateParam : new Date(dateParam);
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  const today: any = new Date();
  const yesterday: any = new Date(today - DAY_IN_MS);
  const seconds: any = Math.round((today - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const isToday = today.toDateString() === date.toDateString();
  const isYesterday = yesterday.toDateString() === date.toDateString();
  const isThisYear = today.getFullYear() === date.getFullYear();

  if (seconds < 5) {
    return "now";
  } else if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (seconds < 90) {
    return "about a minute ago";
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (isToday) {
    return getFormattedDate(date, "Today"); // Today at 10:20
  } else if (isYesterday) {
    return getFormattedDate(date, "Yesterday"); // Yesterday at 10:20
  } else if (isThisYear) {
    return getFormattedDate(date, false, true); // 10. January at 10:20
  }

  return getFormattedDate(date); // 10. January 2017. at 10:20
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
