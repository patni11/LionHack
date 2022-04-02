import React, { useState } from "react";
import style from "./ActivityFeed.module.css";
import Feed from "./feed";

function ActivityFeed() {
  const [feedData, setFeedData] = useState([
    {
      image: "/fff.png",
      address: "shubhpatni.eth",
      activity_type: "NFT",
      activity_title: "Shubh Just Made the BANK",
      activity_description:
        " Shubh sold his hypotetical Azuki for 500ETH and made a profit of 499ETH",
      id: "0x050e1se9d457faf19b02f1f310859a2dbfc2c55ef11762a44096f3f81fdae1b5",
    },
    {
      image: "/fff.png",
      address: "shubhpatni.eth",
      activity_type: "NFT",
      activity_title: "Shubh Just Made the BANK",
      activity_description:
        " Shubh sold his hypotetical Azuki for 500ETH and made a profit of 499ETH",
      id: "0x050e1ce9h457faf19b02f1f310859a2dbfc2c55ef11762a44096f3f81fkae1b5",
    },
    {
      image: "/fff.png",
      address: "shubhpatni.eth",
      activity_type: "NFT",
      activity_title: "Shubh Just Made the BANK",
      activity_description:
        " Shubh sold his hypotetical Azuki for 500ETH and made a profit of 499ETH",
      id: "0x050e1ck9d457faf19b02f1f310859a2dbfc2c55ef11762a44096f3h81fdae1b5",
    },
    {
      image: "/fff.png",
      address: "shubhpatni.eth",
      activity_type: "NFT",
      activity_title: "Shubh Just Made the BANK",
      activity_description:
        " Shubh sold his hypotetical Azuki for 500ETH and made a profit of 499ETH",
      id: "0x050e1ce9d457fafs9b02f1f310859a2dbfc2c55ef11762a440s6f3f81fdae1b5",
    },
    {
      image: "/fff.png",
      address: "shubhpatni.eth",
      activity_type: "NFT",
      activity_title: "Shubh Just Made the BANK",
      activity_description:
        " Shubh sold his hypotetical Azuki for 500ETH and made a profit of 499ETH",
      id: "0x050e1ce9d457faf19302f1f310859a2dbfc2c55ef11762a44096f3f81fdae1b5",
    },
  ]);

  return (
    <div className={style.ActivityFeed}>
      {feedData.map((feed) => {
        return (
          <Feed
            image={feed.image}
            address={feed.address}
            activity_type={feed.activity_type}
            activity_title={feed.activity_title}
            activity_description={feed.activity_description}
            key={feed.id}
          ></Feed>
        );
      })}
    </div>
  );
}

export default ActivityFeed;
