import React, { useContext, useEffect, useState } from "react";
import AxiosApi from "../api/AxiosApi";
import { UserContext } from "../context/UserStore";
import MySubsNone from "./MySubsNone";
import MySubsTrue from "./MySubsTrue";


const MySubs = () => {
  const context = useContext(UserContext);
  const { userId } = context;

  // 내 구독권 조회
  const [mySubsInfo, setSubsInfo] = useState("");

  useEffect(() => {
    const mySubsInfo = async() => {
      const response = await AxiosApi.myInfoGet(userId);
      if(response.status === 200) setSubsInfo(response.data);
    };
    mySubsInfo();
  },[userId]);

  console.log(mySubsInfo);

  return(
    <>
    {mySubsInfo && mySubsInfo.map(mySubs => (
      <div key={mySubs.id}>
        {/* {mySubs.isSub} */}
        {(mySubs.isSub.trim() === 'Y') ? <MySubsTrue /> : <MySubsNone />}
        </div>
    ))}
    </>
  )
}

export default MySubs;