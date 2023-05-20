import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import x from "../images/x.png"
import { Link } from "react-router-dom";
import down from "../images/arrow-down.png"
import { UserContext } from "../context/UserStore";
import AxiosApi from "../api/AxiosApi";

const Head = styled.div`
  margin-bottom: 50px;
  p {
    font-size: 1.3em;
    font-weight: bold;
  }
`;

const SectionBox = styled.div`
  height: 300px;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  font-weight: bold;
  gap: 50px;
  margin-bottom: 20px;
`;

const MoreContainer = styled.div`
    width: 100%;
    height: 20px;
    margin-bottom: 100px;

    .moreBox {
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      margin-right: 25px;
    }

    img {
      width: 15px;
      height: 15px;
      cursor: pointer;
    }
    p {
      font-size: 0.7em;
      color: darkgray;
      font-weight: bold;
      margin-bottom: 0;
      cursor: pointer;
    }
`;

const MyReviewSection2 = () => {
  const context = useContext(UserContext);
  const { userId } = context;

  // 작성 가능한 후기 조회
  const [myWriteInfo, setMyWriteInfo] = useState("");
  useEffect(() => {
    const myWriteInfo = async() => {
      const response = await AxiosApi.myWriteGet(userId);
      if(response.status === 200) setMyWriteInfo(response.data);
    };
    myWriteInfo();
  }, [userId]);

  // 강의 번호
  const [lectureId, setLectureId] = useState("");
  const [startIndex2, setStartIndex2] = useState(0);
  const [endIndex2, setEndIndex2] = useState(2);

  const sendLecture = (lectureId) => {
    setLectureId(lectureId);
    console.log(lectureId);
  }

  const clickMore2 = () => {
    setEndIndex2(endIndex2 + 2);
  }

  return(
    <>
     <Head>
      <p>작성 가능한 후기</p>
    </Head>
    <SectionBox>
    {myWriteInfo.length === 0 ? (
      <div className="no">
      <img src={x} alt="엑스" />
      <p>작성 가능한 후기가 없습니다</p>
    </div>
    ) : (myWriteInfo.slice(startIndex2, endIndex2).map(myWrite => (
    <div className="reviewbox" key={myWrite.myLectureNum}>
      <div className="reviewhead">
      <img src={myWrite.thum} alt="강의이미지" />
        <div className="title">
          <p>{myWrite.title}</p>
          <p>{myWrite.classDay}(수강일)</p>
        </div>
      </div>
      <div className="buttonbox">
        <hr />
        <Link to={`/MyWriteReview/${myWrite.lnum}`} style={{ textDecoration: "none", color: "inherit"}}>
        <button onClick={() => sendLecture(myWrite.lnum)}>후기 작성</button>
        </Link>
      </div>
    </div>
    )))}
    </SectionBox>
    <MoreContainer>
     {endIndex2 < myWriteInfo.length && 
      <div className="moreBox" onClick={clickMore2}>
      <p>더보기</p>
      <img src={down} alt="더보기"/>
      </div>
      }
    </MoreContainer>
    </>
  );
};

export default MyReviewSection2;