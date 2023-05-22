// 구독 환불
import React from "react";
import AxiosApi from "../api/AxiosApi";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  `;

const RePayBtn = styled.button`margin-top: 20px;
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


const Refund = () => {
  // 해당 PaymentNum 갖고와서 쏴주면 끝.
  
  const navigate = useNavigate(); // 환불성공시 마이페이지 화면으로?
  
  const onClickPayBack = async() => {
    console.log("환불")
    try {
      const paymentNum = 1; // 환불할 paymentNUm 긁어올 예정
      const response = await AxiosApi.payBack(paymentNum);
      const isRefund = response.data;
      if(isRefund) {
        console.log("구독권 환불 성공");
        navigate("/MyPage");
      } else {
        console.error("환불 오류");
        navigate("/Mypage"); // 환불실패시 어디로가야할지 ? 
      }
    } catch (error) {
      console.error("환불 요청 중 오류가 발생했습니다", error);
      navigate("/Mypage"); // 이하동문
    };
    
  };

  return(
    <Container>
      <RePayBtn onClick={onClickPayBack}>환불하기</RePayBtn>
    </Container>
  );
};

export default Refund;