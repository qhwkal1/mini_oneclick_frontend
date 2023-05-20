import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../utils/Modal";
import AxiosApi from "../api/AxiosApi";
import styled from "styled-components";
import view from "../images/view.png";
import Header from "./Header";
import Footer from "./Footer";

const BodyContainer = styled.div`
  width: 100vw;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  width: 485px;
  margin: 0 auto;

  .title {
    display: flex;
    justify-content: center;
  }

  .item {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
  }

  .hint {
    display: flex;
    margin-bottom: 10px;
    margin-right: 35px;
    justify-content: right;
    align-items: center;
    font-size: 12px;
  }
  .success {
    color: green;
  }
  .error {
    color: red;
  }

  .terms {
    // 하..
    /* width: 400px; */
    margin-left: 35px;
    margin-right: 35px;

    .termItem {
      display: flex;
      font-size: .7rem;
      align-items: center;
    }
  }

  .enable-button {
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
  .enable-button:active {

  }
  .disable-button {
    margin-top: 10px;
    margin-left: 30px;
    margin-right: 30px;
    background-color: lightgrey;
    color: white;
    border: none;
    width: 415px;
    height: 40px;
    border-radius: 5px;
  }

  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: grey;
    font-size: 13px;
    margin-bottom: 50px;

    .link_style {
      color: inherit;
    }
    p {
      margin-right: .5em;
    }
  }
`;

const Input = styled.input`
  margin-left: 30px;
  margin-right: 30px;
  width: 400px;
  /* height: auto; */
  line-height : normal;
  padding: .8em .5em;
  font-family: inherit;
  border: 1px solid #999;
  border-radius: 2px;
  outline-style: none;
`;

const SignUp = () => {
  const navigate = useNavigate();
   // 키보드 입력
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputConPw, setInputConPw] = useState("");
  const [inputTeach, setInputTeach] = useState("");

  // 오류 메시지
  const [mailMessage, setMailMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [idMessage, setIdMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [conPwMessage, setConPwMessage] = useState("");
  const [teachMessage, setTeachMessage] = useState("");

  // 유효성 검사
  const [isName, setIsName] = useState(false);
  const [isMail, setIsMail] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isId, setIsId] = useState(false);
  const [isPw, setIsPw] = useState(false)
  const [isConPw, setIsConPw] = useState(false);
  const [isTeach, setIsTeach] = useState(false);

  // 모달
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModelText] = useState("중복된 아이디입니다.");
  const [modalA, setModalA] = useState(false);
  const [modalB, setModalB] = useState(false);

  // 가입 약관
  const [allCheck, setAllCheck] = useState(false);
  const [checkA, setCheckA] = useState(false);
  const [checkB, setCheckB] = useState(false);
  const [checkC, setCheckC] = useState(false);
  const [checkD, setCheckD] = useState(false);
  // const [disable, setDisable] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
    setModalA(false);
    setModalB(false);
  };

  const onChangeName = (e) => {
    setInputName(e.target.value);
    setIsName(true);
  };
  

  const onChangeMail = (e) => {
    const mailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const mailCurrent = e.target.value;
    setInputEmail(mailCurrent);

    if (!mailRegex.test(mailCurrent)) {
      setMailMessage('올바른 형식이 아닙니다.')
      setIsMail(false)
    } else {
      setMailMessage('')
      setIsMail(true);
    }
  }

  const onChangePhone = (e) => {
    const phoneRegex =  /^\d{3}-\d{3,4}-\d{4}$/;
    const phoneCurrent = e.target.value;
    setInputPhone(phoneCurrent);

    if(!phoneRegex.test(phoneCurrent)) {
      setPhoneMessage('올바른 형식이 아닙니다.')
      setIsPhone(false)
    } else {
      setPhoneMessage('')
      setIsPhone(true);
    }
  }

  const onChangId = (e) => {
    setInputId(e.target.value)
    if (e.target.value.length < 5 || e.target.value.length > 12) {
        setIdMessage("5자리 이상 12자리 미만으로 입력해 주세요.");
        setIsId(false);    
    } else {
        setIdMessage("");
        setIsId(true);
    }
  }

  const onChangePw = (e) => {
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,16}$/;
    const passwordCurrent = e.target.value ;
    setInputPw(passwordCurrent);
    if (!passwordRegex.test(passwordCurrent)) {
        setPwMessage('숫자, 영문자, 특수문자 조합으로 8자리 이상 16자리 이하로 설정해주세요.')
        setIsPw(false)
    } else {
        setPwMessage('')
        setIsPw(true);
    }        
  }

  const onChangeConPw = (e) => {
    const passwordCurrent = e.target.value ;
    setInputConPw(passwordCurrent)
    if (passwordCurrent !== inputPw) {
        setConPwMessage('비밀번호가 일치하지 않습니다.')
        setIsConPw(false)
    } else {
        setConPwMessage('')
        setIsConPw(true);
    }      
  }

  const onChangeTeach = (e) => {
    const teachRegex =  /^[yYnN]$/;
    const teachCurrent = e.target.value;
    setInputTeach(teachCurrent);

    if(!teachRegex.test(teachCurrent)) {
      setTeachMessage('Y나 N으로 입력해주세요.')
      setIsTeach(false)
    } else {
      setTeachMessage('')
      setIsTeach(true);
    }
  }

  const onClickLogin = async() => {
      console.log("Click 회원가입");
      // 가입 여부 우선 확인
      const memberCheck = await AxiosApi.memberRegCheck(inputId);
      console.log("가입 가능 여부 확인 : ", memberCheck.data);
      // 가입 여부 확인 후 가입 절차 진행

      if (memberCheck.data === true) {
        console.log("가입된 아이디가 없습니다. 가입 단계를 진행합니다.");
        const memberReg = await AxiosApi.memberReg(inputName, inputEmail, inputPhone, inputId, inputPw, inputTeach);
        console.log(memberReg.data.result);
        if(memberReg.data === true) {
          navigate('/home');
        } else {
          setModalOpen(true);
          setModelText("회원가입에 실패했습니다.");
        }

      } else {
        console.log("이미 가입된 회원 입니다.")
        setModalOpen(true);
        setModelText("이미 가입된 회원 입니다.");
      } 
  }

  const allBtn = () => {
    if(allCheck === false) {
      setCheckA(true)
      setCheckB(true)
      setCheckC(true)
      setCheckD(true)
    } else {
      setCheckA(false)
      setCheckB(false)
      setCheckC(false)
      setCheckD(false)
    }
  }
  
  const BtnA = () => {
    if(checkA === false) {
      setCheckA(true) 
    } else {
      setCheckA(false)
    }
  }

  const BtnB = () => {
    if(checkB === false) {
      setCheckB(true) 
    } else {
      setCheckB(false)
    }
  }

  const BtnC = () => {
    if(checkC === false) {
      setCheckC(true) 
    } else {
      setCheckC(false)
    }
  }

  const BtnD = () => {
    if(checkD === false) {
      setCheckD(true) 
    } else {
      setCheckD(false)
    }
  }

  useEffect(() => {
    if(checkA === true && checkB === true && checkC === true && checkD === true) {
      setAllCheck(true)
    } else {
      setAllCheck(false)
    }
  }, [checkA, checkB, checkC, checkD])

  const agreeA = () => {
    setModalA(true);
  }

  const agreeB = () => {
    setModalB(true);
  }

  return(
    <>
    <Header />
    <BodyContainer>
    <Container>
      <div className="title">
        <h3>회원가입 하기</h3>
      </div>

      <div className="item">
        <Input type="text" placeholder="이름" value ={inputName} onChange={onChangeName}/>
      </div>
      <div className="hint">
      </div>

      <div className="item">
        <Input type="email" placeholder="이메일 주소" value ={inputEmail} onChange={onChangeMail}/>
      </div> 

      <div className="hint">
        {inputEmail.length > 0 && <span className={`message ${isMail ? 'success' : 'error'}`}>{mailMessage}</span>}
      </div>

      <div className="item">
        <Input type="phone" placeholder="전화번호" value ={inputPhone} onChange={onChangePhone}/>
      </div>

      <div className="hint">
        {inputPhone.length > 0 && <span className={`message ${isPhone ? 'success' : 'error'}`}>{phoneMessage}</span>}
      </div>

      <div className="item">
        <Input type="id" placeholder="아이디" value ={inputId} onChange={onChangId}/>
      </div>

      <div className="hint">
        {inputId.length > 0 && <span className={`message ${isId ? 'success' : 'error'}`}>{idMessage}</span>}
      </div>

      <div className="item">
        <Input type="password" placeholder="패스워드" value ={inputPw} onChange={onChangePw}/>
      </div>

      <div className="hint">
        {inputPw.length > 0 && (
        <span className={`message ${isPw ? 'success' : 'error'}`}>{pwMessage}</span>)}
      </div>

      <div className="item">
        <Input type="password" placeholder="패스워드 확인" value ={inputConPw} onChange={onChangeConPw}/>
      </div>

      <div className="hint">
        {inputPw.length > 0 && (
        <span className={`message ${isConPw ? 'success' : 'error'}`}>{conPwMessage}</span>)}
      </div>

      <div className="item">
        <Input type="text" placeholder="강사이신가요? (Y / N)" value ={inputTeach} onChange={onChangeTeach}/>
      </div>

      <div className="hint">
        {inputTeach.length > 0 && <span className={`message ${isTeach ? 'success' : 'error'}`}>{teachMessage}</span>}
      </div>

      <form action="" method="post" className="terms">
        <div className="termsBox">
          <h5>약관 동의</h5>
          <div className="termItem">
            <input type="checkbox" id="allCheck" checked={allCheck} onChange={allBtn}/>
            <label for="allCheck"><b>전체 동의</b></label>
          </div> 
          <hr />
          <div className="termItem">
            <input type="checkbox" id="checkA" checked={checkA} onChange={BtnA}/>
            <label for="checkA">(필수) 서비스 이용약관 동의</label>
            <img src={view} alt="약관설명" style={{width: "14px", height: "14px"} } onClick={agreeA}/>
          </div>
          <div className="termItem">
            <input type="checkbox" id="checkB" checked={checkB} onChange={BtnB}/>
            <label for="checkB">(필수) 개인정보 수집 및 이용에 대한 동의</label>
            <img src={view} alt="약관설명" style={{width: "14px", height: "14px"}} onClick={agreeB}/>
          </div>
          <div className="termItem">
            <input type="checkbox" id="checkC" checked={checkC} onChange={BtnC}/>
            <label for="checkC">(필수) 만 14세 이상입니다.</label>
          </div>
          <div className="termItem">
            <input type="checkbox" id="checkD" checked={checkD} onChange={BtnD}/>
            <label for="checkD">(선택) 마케팅 수신에 동의합니다.</label>
          </div>
        </div>
      </form>

      <div className="item">
        {(checkA && checkB && checkC && isId && isPw && isConPw && isName && isMail && isTeach) ? 
        <button className="enable-button" onClick={onClickLogin}>회원가입 하기</button> :
        <button className="disable-button">회원가입 하기</button>}
        <Modal open={modalOpen} close={closeModal} header="오류">{modalText}</Modal>
      </div>
      <div className="login">
            <p>이미 계정이 있으신가요? </p>
            <Link to='/login' className="link_style">로그인</Link>
          </div>
      <Modal open={modalA} close={closeModal} header="서비스이용약관">
        ONE Click은 회원에게 콘텐츠, 상품 등을 제공하는 서비스 플랫폼 입니다. 
        회원은 컴퓨터, 휴대전화 등 정보통신기기를 사용하여 ONE Click이 회원에게 제공하는 서비스(이하 “서비스”)를 이용할 수 있으며, 
        서비스의 구체적인 내용과 이용 조건을 이용약관 및 정책, 서비스 페이지 등에서 확인할 수 있습니다.
      </Modal>
      <Modal open={modalB} close={closeModal} header="개인정보수집">
        이용자는 개인정보 수집 및 이용 동의를 거부할 권리가 있습니다. 다만 개인정보 수집 및 이용 동의를 거부하실 경우 회원가입이 제한됩니다.
      </Modal>
      </Container>
      </BodyContainer>
      <Footer />
      </>
  );
};

export default SignUp;