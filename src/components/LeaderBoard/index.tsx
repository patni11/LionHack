import React from "react";
import Image from "next/image";

// styles
// import styles from "../styles/LeaderBoard.module.css"
import feedStyle from "../ActivityFeed/Feed.module.css";
import styles from "./LeaderBoard.module.css";

// fetch leaderboard data
export async function getServerSideProps() {
  // Fetch data from external API

  //   const res = await fetch(`https://.../data`)
  //   const data = await res.json()

  // Pass data to the page via props
  const data = {};
  return { props: { data } };
}

interface LeaderBoardInterface {
  leaderData?: any;
}

const LeaderBoard = ({ leaderData }: LeaderBoardInterface) => {
  leaderData = [
    {
      img: "/fff.png",
      name: "Mickey",
      netWorth: 1000,
      address: "0x0D01EC1ea66b0270bfE22B12f8F1d1E209f1E458",
    },
    {
      img: "/fff.png",
      name: "Minnie",
      netWorth: 900,
      address: "0x0D01EC1ea66b0270bfE22B12f8F1d1E209f1E458",
    },
  ];

  if (!leaderData) return null;

  return (
    <div className={`p-5`}>
      <h4 className={``}>LeaderBoard</h4>
      {leaderData &&
        leaderData.map((el: any) => (
          <div key={el.name} className="d-flex">
            <div className="">
              <Image
                src={"/fff.png"}
                alt={`Picture of ${el.name}`}
                width={50}
                height={50}
                className={`${feedStyle.feed_image} p-1`}
              />
            </div>

            <div>
              <div className={styles.textBold}> {el.name} </div>
              <div className={styles.netWorth}> ${el.netWorth}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default LeaderBoard;
