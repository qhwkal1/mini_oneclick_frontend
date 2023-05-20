import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import payCom from "../images/payCom.png";

const Container = styled.div`
    background-color: #FEFDFD;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid lightgray;
    padding: 20px;
    width: 100%;

`;
const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  background-color: #FC7373;
  color: white;
  font-weight: bold;

  /* 모바일 */
  @media (max-width: 768px) {
    width: 100%;
  }
`;



const CompliteContainer = styled.div`
    width: 100%;
    height: 500px;
    border: none;
    margin-top: 65px;
    background-image: url(${payCom});
    background-size: cover;
    background-position: center;
`;


const PayComplite = () => {


    return(
        <Container>
            <CompliteContainer></CompliteContainer>
                <Link to="/Mypage">
                    <Button className="btnstyle">마이페이지</Button>
                </Link>
                <Link to="/MySubs">내 구독권</Link>
        </Container>
    );
};

export default PayComplite;