import React from "react";
import Image from "next/image";

// styles 
// import styles from "../styles/LeaderBoard.module.css"
import feedStyle from '../ActivityFeed/Feed.module.css'
import styles from "./LeaderBoard.module.css"

// fetch leaderboard data
export async function getServerSideProps() {
    // Fetch data from external API

//   const res = await fetch(`https://.../data`)
//   const data = await res.json()

// Pass data to the page via props
const data = {}
return { props: { data } }
}

const LeaderBoard = ({leaderData} : any) => {
    leaderData = [{img: 'https://thumbs.dreamstime.com/z/man-profile-cartoon-smiling-round-icon-vector-illustration-graphic-design-135443422.jpg',name: 'Mickey', netWorth: 1000}, {img: 'https://image.shutterstock.com/image-illustration/color-portrait-cute-cartoon-girl-260nw-1793950984.jpg',name: 'Minnie', netWorth: 900}]

    if (!leaderData) return null;

    return <div className={`p-5`}>
        <h4 className={``}>LeaderBoard</h4>
        {leaderData && leaderData.map((el: any) => <div key={el.name} className="d-flex">
            <div className=""> 
                <Image src={"/fff.png"} alt={`Picture of ${el.name}`} width={50} height={50} className={`${feedStyle.feed_image} p-1`}/>
                </div>

             <div>
               <div className={styles.textBold}> {el.name} </div>
                <div className={styles.netWorth}> ${el.netWorth}</div>
            </div>
            </div>)}
    </div>
}

export default LeaderBoard;