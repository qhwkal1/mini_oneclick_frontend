import React from "react";
import AxiosApi from "../api/AxiosApi";
import styled from "styled-components";

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
  
  const onClickPayment = () => {
    console.log("환불")
    
  }

  return(
    <Container>
      <RePayBtn onClick={onClickPayment}>환불하기</RePayBtn>
    </Container>
  );
};

export default Refund;