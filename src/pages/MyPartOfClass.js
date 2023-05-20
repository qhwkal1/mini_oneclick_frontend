import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import x from "../images/x.png"
import AxiosApi from "../api/AxiosApi";
import { UserContext } from "../context/UserStore";
import SectionBox2 from './MyClassSectionBox';


const Section1 = styled.div`
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  font-weight: bold;
  font-size: 1.3em;
  gap: 80px;

  .no {
    width: 100%;
    text-align: center;
    margin-top: 100px;
    font-size: 0.6em;
    color: darkgray;

    img {
      width: 20px;
      height: 20px;
    }
  }
`;

const SectionBox1 = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 240px;
  height: 290px;
  /* border: 1px solid lightgray; */
  margin-bottom: 50px;
`;

const MyPartOfClass = () => {
  
  const context = useContext(UserContext);
  const { userId } = context;
  
  // 수강 중인 클래스 조회
  const [myClassInfo, setMyClassInfo] = useState("");

  useEffect(() => {
    const myClassInfo = async() => {
      const response = await AxiosApi.myClassGet(userId);
      if(response.status === 200) setMyClassInfo(response.data);
    };
    myClassInfo();
  },[userId]);

   return(
   <>
   <Section1>     
      {myClassInfo.length === 0 ? (
        <div className="no">
        <img src={x} alt="엑스" />
        <p>수강중인 클래스가 없습니다</p>
      </div>
      ) : (myClassInfo.map(myClass => (
        <SectionBox1 key={myClass.num}>
        <SectionBox2  myClass={myClass} />
        </SectionBox1>
      )))}    
  </Section1>
   </>
   )
}

export default MyPartOfClass;