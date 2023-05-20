import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserStore";
import AxiosApi from "../api/AxiosApi";
import leftarrow from "../images/left-arrow.png";
import rightarrow from "../images/right-arrow.png";
import x from "../images/x.png"
import SectionBox3 from './MyClassSectionBox';

const Section1 = styled.div`
  /* height: 400px; 없을 때 공백 넓이 지정하려고 만든거였음*/
  display: flex;
  justify-content: left;
  overflow-x: hidden;
  flex-wrap: wrap;
  font-weight: bold;
  font-size: 1.3em;
  gap: 90px;
`;

const SectionBox1 = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 240px;
  height: 290px;
  box-sizing: border-box;
  /* border: 1px solid lightgray; */
  margin-bottom: 30px;
`;

const MyClassSection1 = () => {
  const context = useContext(UserContext);
  const { userId } = context;

  // 클래스 정보 받아오기
  const [myClassInfo, setMyClassInfo] = useState("");

  // 더보기 기능 
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(3);

  useEffect(() => {
    const myClassInfo = async() => {
      const response = await AxiosApi.myClassGet(userId);
      if(response.status === 200) setMyClassInfo(response.data);
    };
    myClassInfo();
  },[userId]);

   // 더보기 이전, 다음 버튼 구현
   const prevClick = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 3)
      setEndIndex(endIndex - 3);
    }
  };
  
  const nextClick = () => {
    if(endIndex < myClassInfo.length) {
    setStartIndex(startIndex + 3)
    setEndIndex(endIndex + 3);
    }
  };

  return(
    <>
      <p className="head">수강 중인 클래스</p>
      {myClassInfo.length > 3 && (
      <div className="arrow">
        <img src={leftarrow} alt="이전" onClick={prevClick}/>
        <img src={rightarrow} alt="다음" onClick={nextClick}/>
      </div>
      )}
      <Section1> 
        {myClassInfo.length === 0 ? (
          <div className="no">
            <img src={x} alt="엑스" />
            <p>수강중인 클래스가 없습니다</p>
          </div>
        ) : (myClassInfo.slice(startIndex, endIndex).map(myClass => (
          <SectionBox1 key={myClass.num}>
          <SectionBox3 myClass={myClass} />
          </SectionBox1> 
        )))}
      </Section1>
    </>
  )
}

export default MyClassSection1;