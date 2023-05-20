import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../utils/Modal";

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;

  button {
    cursor: pointer;
    font-size: 0.8em;
    width: 60px;
    height: 20px;
    border: 1px solid lightgrey;
    background-color: white;
  }

  li{
    list-style: none;
    font-weight: normal;
    font-size: .5em;
    margin: 10px 0;
  }
  ul {
    font-weight: bold;
    font-size: .8em;
    padding-left: 0;
  }
  a {
    text-decoration: none;
    color: inherit;
  }

  .PFooter {
    font-size: .6em;
    margin-top: 30px;
  }
`;

const MypageFooter = () => {

  const [modalCall, setModalCall] = useState(false);

  const call = () => {
    setModalCall(true);
  };

  const closeModal = () => {
    setModalCall(false);
  } 

  return(
    <>
    <Footer>
    <ul> ONE Click
      <li><a href="#!">공지사항</a></li>
      <li><a href="#!">서비스 소개</a></li>
      <li><a href="#!">채용</a></li>
    </ul>
    <ul> 이용안내
      <li><a href="#!">클래스 가이드</a></li>
      <li><a href="#!">구독권 가이드</a></li>
      <li><a href="#!">제휴</a></li>
   </ul>
    <ul> 정책
      <li><a href="#!">이용 약관</a></li>
      <li><a href="#!">개인정보 처리방침</a></li>
    </ul>
    <ul>고객지원
      <li>평일 9:00 ~ 16:00</li>
      <div>
        <button className="callBtn" onClick={call}>문의</button>
        <Modal open={modalCall} close={closeModal}>
          상담원 전화 연결 : 1644-1644
        </Modal>
      </div>
    </ul>
    </Footer>
    </>
  );
};

export default MypageFooter;