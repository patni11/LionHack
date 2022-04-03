import React, { useState, useEffect } from "react";
import style from "./ActivityFeed.module.css";
import { formatAddress } from "@/utils/helper";
import { BasicUserInfo, FollowListInfoResp } from "@/utils/types";
import { reccomendationQuery } from "@/utils/query"; 

const getUserRecs = async (address : string) => {
    const response = await reccomendationQuery({
        address
    });
    console.log(response.data.list[0]);
};