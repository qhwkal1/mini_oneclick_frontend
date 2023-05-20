import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import { UserContext } from "../context/UserStore";
import sign from "../images/warning.png";

const Head = styled.div`
  display: flex;
  align-items: center;

  p {
    font-size: 1.3em;
    font-weight: bold;
  }

  button {
    width: 60px;
    height: 17px;
    border-radius: 60px;
    border: none;
    background-color: #FC7373;
    text-align: center;
    font-size: 0.8em;
    font-weight: bold;
    color: white;
    margin-left: 20px;
  }
`;

const Body = styled.div`
  hr {
    background-color: lightgray;
    border: .3px solid lightgray;
  }
  div {
    margin-top: 30px;
  }
  .div1 {
    margin-top: 50px;
    
    span {
      font-weight: bold;

      &:nth-child(2) {
        color: #FC7373;
        font-size: .9em;
      }
    }
  }
  .div2 {
    span {
      font-weight: bold;
      &:nth-child(2) {
        color: #FC7373;
        font-size: .9em;
      }
    }
  }
  .div3 {
    margin-bottom: 50px;
    span {
      font-weight: bold;
      &:nth-child(2) {
        color: #FC7373;
        font-size: .9em;
      }
    }
  }
  .notification {
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    /* border: 1px solid lightgray; */

    img {
      width: 15px;
      height: 15px;
    }

    p {
      font-size: 0.8em;
      font-weight: bold;
      color: darkgray;
      margin-left: 10px;
    }
  }
  
  .notifyDesc {
    width: 70%;
    font-size: 0.8em;
    color: darkgray;

    li {
      font-size: 0.7em;
    }
  }
`;

const MySubsTrue = () => {
  const context = useContext(UserContext);
  const { userId } = context;

  // 내 구독권 조회
  const [mySubsInfo, setSubsInfo] = useState("");

  useEffect(() => {
    const mySubsInfo = async() => {
      const response = await AxiosApi.mySubsGet(userId);
      if(response.status === 200) setSubsInfo(response.data);
    };
    mySubsInfo();
  },[userId]);

  return(
    <>
    <Head>
      <p>내 구독권</p>
      <button>이용중</button>
    </Head>
    <Body>
    {mySubsInfo && mySubsInfo.map(mySubs => (   
      <div key={mySubs.id}>
        <hr />
        <div className="div1">
        <span>구독권 종류 : </span><span>{mySubs.subsType}</span>
        </div>
        <br />
        <div className="div2">
        <span>구독권 결제일 : </span><span>{mySubs.mySubStartDate}</span>
        </div>
        <br />
        <div className="div3">
        <span>구독권 만료일 : </span><span>{mySubs.mySubEndDate}</span>
        </div>
      </div>
    ))}
      <br />
      <div className="notification">
        <img src={sign} alt="알림"></img>
        <p>유의사항</p>
      </div>
      <div className="notifyDesc">
        <p>
          <li>하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
          하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
          하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
          하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
          하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
          </li>
          <li>하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
          하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
          하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
          하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
          하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이</li>
          <li>하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
          하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
          하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
          하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
          하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이</li>
          <li>하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
          하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
          하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
          하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
          하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이</li>
          <li>하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
          하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
          하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
          하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
          하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이</li>
          <li>하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
          하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
          하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
          하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
          하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이</li>
          <li>하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
          하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
          하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
          하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
          하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이</li>
        </p>
      </div>
    </Body>
    </>
  )
}

export default MySubsTrue;