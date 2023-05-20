import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MainIMG from "./Lecture_MainIMG"
import LeftDivision from "./Lecture_LeftDivision";
import RightDivision from "./Lecture_RightDivision";
import Header from "./Header";
import Footer from "./Footer";



const BodyContainer = styled.div`
  max-width: 100%;
  box-sizing: border-box;
  display:flex;
  flex-direction:column;
  /* background-color:black */
`



// 양 쪽 메뉴 분할
const Classlist = styled.div`
  width: 90%;
  display:flex;
  justify-content: space-between;
  align-self: center;
`

const Lecture = () => {
  
  return (
    <>
    <Header />
    <BodyContainer>
      <MainIMG></MainIMG>
      <Classlist>
        <LeftDivision/>
        <RightDivision/>
      </Classlist>
    </BodyContainer>
    <Footer />
    </>
    
  )
}

export default Lecture;