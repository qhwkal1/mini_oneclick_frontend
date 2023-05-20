import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Modal from "../utils/Modal";
import AxiosApi from "../api/AxiosApi";
import Header from "./Header";
import Footer from "./Footer";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-evenly;
  width: 50%;
  margin: 0 auto;
  margin-bottom: 70px;

  .title {
    margin-top: 10px;
    text-align: center;
  }
  
  .item {
    margin: 10px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
  }

    .login {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: grey;
    font-size: 13px;

    .link_style {
      color: inherit;
    }
    p {
      margin-right: .5em;
    }
  }

    .findId {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: grey;
    font-size: 13px;

    .link_style {
      color: inherit;
    }
    p {
      margin-right: .5em;
    }
  }

  .itemBtn {
    margin-top: 10px;
    margin-left: 30px;
    margin-right: 30px;
    background-color: #FC7373;
    color: white;
    border: none;
    width: 415px;
    height: 40px;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const Input = styled.input`
  margin-left: 30px;
  margin-right: 30px;
  width: 400px;
  line-height : normal;
  padding: .8em .5em;
  font-family: inherit;
  border: 1px solid #999;
  border-radius: 2px;
  outline-style: none;
`;

const FindPw = () => {

  const [inputName, setInputName] = useState("");
  const [inputId, setInputId] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");


  const onChangeEmail = (e) => {
    setInputEmail(e.target.value);
  };

  const onChangeId = (e) => {
    setInputId(e.target.value);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onChangeName = (e) => {
    setInputName(e.target.value);
  };

  const onClickFindPw = async () => {
    const lostPwGet = await AxiosApi.lostPwGet(inputName, inputId, inputEmail);

    if(lostPwGet.status === 200) {
      if(lostPwGet.data) {
        setModalOpen(true);
        setModalText("비밀번호 : " + lostPwGet.data);
      } else {
        setModalOpen(true);
        setModalText("존재하지 않는 회원정보입니다.");
      }
    }
  };

  return(
    <>
    <Header />
    <Container>
      <div className="title">
        <h3>비밀번호 찾기</h3>
      </div>
      <div className="item">
        <Input type="text" placeholder="이름" value={inputName} onChange={onChangeName}/>
      </div>
      <div className="item">
        <Input type="text" placeholder="아이디" value={inputId} onChange={onChangeId}/>
      </div>
      <div className="item">
        <Input type="text" placeholder="이메일" value={inputEmail} onChange={onChangeEmail}/>
      </div>
      <div className="item">
        <button className="itemBtn" onClick={onClickFindPw}>비밀번호 찾기</button>
        <Modal open={modalOpen} close={closeModal}>{modalText}</Modal>
      </div>
      <div className="findId">
        <p>아이디가 기억나지 않으신가요?</p>
        <Link to='/findId' className="link_style">아이디 찾기</Link>
      </div>
      <div className="login">
        <p>기존에 사용하던 계정이 있으신가요?</p>
        <Link to='/login' className="link_style">로그인</Link>
      </div>
    </Container>
    <Footer />
    </>
  );
};

export default FindPw;