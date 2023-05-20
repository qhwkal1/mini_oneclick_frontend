import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import heart from "../images/heart.png";
import AxiosApi from "api/AxiosApi";

const Contain = styled.div`
  max-width: 1280px;
  /* margin: 0 auto; */
  box-sizing: border-box;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
`;
const Sort = styled.div`
  list-style: none;
  display:flex;
  flex-direction:row;
  li {
    margin: 0 5px;
  }

  .activeSort {
    color: gray;
    font-weight: bold;
  }
  .none {
    
  }
`;
const SectionContain = styled.div`

`;
const Section1 = styled.div`
  font-weight: bold;
  font-size: 1.3em;
  margin-bottom: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: right;
  /* border: 1px solid black; */
  /* background-color: black; */
`;

const SectionBox1 = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 400px;
  margin: 5px;
  border: 1px solid lightgray;
`;

const Thumbnail = styled.img`
  /* margin: 0 auto; */
  width: 100%;
  height: 200px;
  object-fit: cover;
  overflow: hidden;
  border: 1px solid coral;
`;
const CategoryTextStyle = styled.div`
  padding: 10px 0;
  display: flex;
  /* border: 1px solid black; */
  hr {
    border: .2px solid gray;
    margin: 0;
  }
`
const Category = styled.div`
  padding: 0 5px;
  font-size: 0.6rem;
  font-weight: normal;
  color: gray;
  /* border: 1px solid black; */
`;

const Title = styled.h3`
  display: flex;
  align-items: center;
  padding: 10px 5px;
  margin: 0;
  height: 40px;
  font-size: .9rem;
  font-weight: bold;
  /* margin-top: 5px; */
  /* border: 1px solid black; */
`;

const Description = styled.div`
  font-size: 0.8rem;
  font-weight: normal;
  display:flex;
  height: 30px;
  padding: 5px 5px;
  color: gray;
  /* border: 1px solid black; */
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: 5px;
`;
const PriceDate = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  .price, .date {
    font-size: 0.8rem;
    font-weight: bold;
    /* padding: 10px 0; */
    margin-right: 10px;
  }

  .dateContain {
    display: flex;
  }
`

const Heart = styled.div`
  position: absolute;
  top: 100px;
  right: 8px;
  img {
    width: 15px;
    height: 15px;
  }
    
`;

const CategoryList = ({ selNum }) => {
  const categoryNum = null; // nav 메뉴에서 강의 카테고리 클릭시 context 로 값 끌어옴

  const info = [
    "요리",
    "베이킹",
    "공예",
    "운동"
  ];
  console.log(info[1-1]);
  const [sortNum, setSortNum] = useState(1);
  // axios 로 받아온 DB를 담아두기
  const [list, setList] = useState([]);

  useEffect(() => {
    const loadLectureList = async() => {
      console.log("loadLectureList 실행");
      const rsp = await AxiosApi.loadList(4);
      if(rsp.status === 200) {
        const sortList = rsp.data;
        console.log(sortList);
        if(sortNum === 1) {
          setList(sortList.sort((a, b) => a.likeCount - b.likeCount)); // 인기순으로 정렬
        } else if (sortNum === 2) {
          setList(sortList.sort((a, b) => a.startDate - b.startDate)); // 날짜 빠른 순으로 정렬
        } else if (sortNum === 3) {
          setList(sortList.sort((a, b) => b.price - a.price)); // 가격 높은 순으로 정렬
        }
      }
      else console.log("loadLectureList 실행 실패");
    }
    loadLectureList();
  },[sortNum]);

  return(
    <Contain>
      <h2>{info[1-1]}</h2>
      <Sort>
        <li><div className={sortNum === 1 ? "activeSort" : "none"} onClick={()=>setSortNum(1)}>인기순</div></li>
        <li><div className={sortNum === 2 ? "activeSort" : "none"} onClick={()=>setSortNum(2)}>등록일순</div></li>
        <li><div className={sortNum === 3 ? "activeSort" : "none"} onClick={()=>setSortNum(3)}>가격순</div></li>
      </Sort>
      <SectionContain>
        <Section1>
        {list && list.map(listData => (
            <div>
          <SectionBox1>
            <Heart><div><img src={heart} alt="좋아요" /></div></Heart>

              <Thumbnail src={listData.thumb} alt="class thumbnail" />
              <CategoryTextStyle>
                <Category>{info[selNum-1]}</Category>
                <hr />
                <Category className="line">{listData.lecturer}</Category>
              </CategoryTextStyle>
              <Title>{listData.name}</Title>
              <Description>{listData.intro}</Description>
              <PriceDate>
                <div className="price">{listData.price}원</div>
                <div className="dateContain">
                  <div className="date">시작일 : {listData.startDate}</div>
                  <div className="date">종료일 : {listData.endDate}</div>
                </div>
              </PriceDate>

          </SectionBox1>
          </div>
            ))}
        </Section1>
        </SectionContain>
    </Contain>
  )
}

export default CategoryList;