// 구독 결제 모듈
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context/UserStore";
import AxiosApi from "../api/AxiosApi";
// import { type } from "@testing-library/user-event/dist/type";


const PayBtn = styled.button`margin-top: 20px;
padding: 10px 20px;
border: none;
background-color: #FC7373;
color: white;
font-weight: bold;
cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

/* 모바일 */
@media (max-width: 768px) {
    width: 100%;
}`;



const Payment = ({ price }) => {
    const { userName, phone, mail, memberNum, lectureNum } = useContext(UserContext);
    let type = ""; // 구독 Type_값을 위해..
      if(price === 300000) {
        type = "3개월";
      } else if(price === 600000) {
        type = "6개월";
      } else if(price === 900000) {
        type = "12개월";
      }

    const navigate = useNavigate(); // 결제성공시 결제완료페이지로!


  const onClickPayment = async () => {
    console.log(userName);
    console.log(phone);
    console.log(mail);
    console.log(memberNum);
    
    // IMP 객체 가져오기
    const { IMP } = window;
    // IMP 객체 초기화
    IMP.init("imp25734285"); // 테스트 가맹점

    try {
      // 사용자 등록 정보
      await IMP.certification({
        merchant_uid: "mid_" + new Date().getTime(),
        company: "OneClick",
        phone: phone,
      });

      // PG 설정 정보
    //   IMP.setConfig({
    //     apiKey: "3437183351607683",
    //     apiVersion: "1.1",
    //   });
      // 결제 데이터 정의
      // 추후 각 컴포넌트 완성되면 props 객체 넘겨서 결제할예정/ 해결완료 회원쪽 context api, amount는 props로 받아옴.

      const data = {
        pg: "kakao",
        pay_method: "kakaopay",
        merchant_uid: `mid_${new Date().getTime()}`,
        amount: price,
        type: type,
        name: `구독권 : ${type}`,
        buyer_name: userName,
        buyer_tel: phone,
        buyer_email: mail,
        memberNum: memberNum, //(회원시퀀스로 데이터베이스에 누가결제했는지 저장할 예정)
        lectureNum: lectureNum // 임시더미데이터 수정예정(강의코드 받으면 contextapi로 가져올예정)
      };
      // 결제 창 호출
      IMP.request_pay(data, callback);
    } catch (e) {
      console.error(e);
    }
  };  

  const callback = async (response) => {
    const { success, error_msg } = response;
    if (success) {
      alert("결제 완료");
      console.log(price); // 지울예정
      console.log(userName);
      console.log(phone);
      console.log(mail);
      console.log(memberNum);
      console.log(lectureNum);
      console.log(type);
      try {
        await AxiosApi.paymentInsert(lectureNum, memberNum, response.merchant_uid, price, type);
        // 위에 1에 lectureNum 들어갈예정 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        navigate("/PayComplite");
      } catch(e) {
        console.error(e);
        console.log(e);
      }
    } else {
      alert(`결제 실패 : ${error_msg}`);
    //   navigate("/PayComplite") 테스트용.. pg사 설정오류.. ㅠ
    }
  };

  return (
    <>
      <PayBtn onClick={onClickPayment}>결제하기</PayBtn>
    </>
  );
};

export default Payment;