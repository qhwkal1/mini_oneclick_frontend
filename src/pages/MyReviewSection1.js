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

const MyReviewSection1 = () => {
  const context = useContext(UserContext);
  const { userId } = context;

  // 작성 후기 조회
  const [myReviewInfo, setMyReviewInfo] = useState("");
  useEffect(() => {
    const myReviewInfo = async() => {
      const response = await AxiosApi.myReviewGet(userId);
      if(response.status === 200) setMyReviewInfo(response.data);
    };
    myReviewInfo();
  }, [userId]);

  // 더보기 기능
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(2);
  const clickMore = () => {
    setEndIndex(endIndex + 2);
  }

  return(
    <>
    <Head>
    <p>작성한 후기</p>
    </Head>
    <SectionBox>
    {myReviewInfo.length === 0 ? (
       <div className="no">
       <img src={x} alt="엑스" />
       <p>작성한 후기가 없습니다</p>
     </div>
    ) : (myReviewInfo.slice(startIndex, endIndex).map(myReview => (
    <div className="reviewbox" key={myReview.num}>
      <div className="reviewhead">
        <img src={myReview.thum} alt="강의이미지" />
        <div className="title">
          <p>{myReview.title}
           {/** 제목은 60자까지만 가능 */}
          </p>
          <p>{myReview.created}(작성일)</p>
        </div>
      </div>
      <div className="contents">
        <hr />
        <p>{myReview.content} {/** 100자까지..? */}
        </p>
      </div>
      <Link to={`/MyUpdateReview/${myReview.lnum}/${myReview.num}`} style={{ textDecoration: "none", color: "inherit"}}>
      <button>수정하기</button>
      </Link>
    </div>
    )))}
    </SectionBox>
    <MoreContainer>
     {endIndex < myReviewInfo.length && 
      <div className="moreBox" onClick={clickMore}>
      <p>더보기</p>
      <img src={down} alt="더보기"/>
      </div>
      }
    </MoreContainer>
    </>
  );
};

export default MyReviewSection1