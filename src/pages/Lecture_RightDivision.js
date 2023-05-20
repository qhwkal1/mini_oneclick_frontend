import React from "react";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import { useState, useEffect } from "react";
import StyledButton from "../utils/StyledButton"
import like_icon from "../images/like_icon.png"
import heart_icon from "../images/heart.png"
import NaverMap from "../utils/NaverMap";


// 오른쪽 메뉴

const Container = styled.div`
  box-sizing: border-box;
  /* margin-right:10px; */
  height: auto;
  max-width: 25%;
  min-width: 25%;
  box-shadow: 1px 1px 1px 1px lightgray;
  /* padding: auto; */
`
const ClassCategory = styled.div`
  display: inline-block;
  margin: 1rem;
  margin-bottom: 0;
  font-size: 12px;
  font-weight: bold;
  padding: 2px;
`
const ClassTitle = styled.div`
  margin: 1rem;
  margin-top:0;
  width: 90%;
  display: flex;
  flex-direction:column;
`
const ClassBtn = styled.div`
  display: flex;
  margin: 5px auto;
  width: 100%;
  justify-content: space-between;
  flex-wrap: nowrap;
  li {
    padding: 5px;
    font-size: 12px;
    font-weight: bold;
    list-style: none;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    width: 28%;
    border-radius: 5px;
    background-color: lightgray;
    img {
      width:15px;
      margin: 3px;
    }
  }
  li:hover {
    background-color: gray;
    cursor: pointer;
  }
`
const Contain = styled.div`
  width: 90%;
  margin: 10px auto;
`
const RightDivision = () => {
  const [list, setList] = useState("");
  
  useEffect(() => {
    const LectureList = async() => {
      const rsp = await AxiosApi.viewLecture(4,4);
      if(rsp.status === 200) setList(rsp.data);
    }
    LectureList();
  }, []);

 return (
  <Container>
    {list && list.map(Lecturelist => (
    <Contain key={Lecturelist.id}>
      <ClassCategory>
        일식
      </ClassCategory>
      <ClassTitle>
        <h3>{Lecturelist.name}</h3>
      </ClassTitle>
      <ClassBtn>
        <li><img src={heart_icon} alt="" />찜하기</li>
        <li><img src={like_icon} alt="" />좋아요</li>
        <li><img src={heart_icon} alt="" />공유</li>
      </ClassBtn>
      <StyledButton>{Lecturelist.price}원 결제하기</StyledButton> 
      <StyledButton>구독하기</StyledButton> 
      <ClassTitle >
        <h2>강의 장소</h2>
        {Lecturelist.addr}
      </ClassTitle>
      <NaverMap children={Lecturelist.addr}>{/* 네이버 지도 */}</NaverMap>
    </Contain> 
    ))}
  </Container>
 );
}

export default RightDivision;