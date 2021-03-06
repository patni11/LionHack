import React from "react";
import style from "./Feed.module.css";

interface FeedInterface {
  img: string | undefined;
  address: string | undefined;
  activity_type: string;
  activity_title: string;
  activity_description: string;
  date: string;
  link: string;
}

function Feed({
  img,
  address,
  activity_type,
  activity_title,
  activity_description,
  date,
  link,
}: FeedInterface) {
  // img, ens name or address, activity type (NFT, DeFi, Trade, Blog, Proposal), Activity Title, Activity Description
  return (
    <div className={style.feed_container}>
      <a href={link} className={style.link}>
        <div className={style.feed_head}>
          <div className={style.head_left}>
            <img src={img} alt="" className={style.feed_image} />
            <h4 className={style.feed_address}> {address}</h4>
          </div>

          <div className={style.head_right}>
            <h5 className={style.activity_type}>{activity_type}</h5>
            <i>
              <h5 className={style.date}>{date}</h5>
            </i>
          </div>
        </div>

        <br></br>
        <br></br>
        <div className={style.feed_second}>
          <h2>{activity_title}</h2>
          <p>{activity_description}</p>
        </div>
      </a>
    </div>
  );
}

export default Feed;
