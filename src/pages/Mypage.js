import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import banner2 from "../images/banner2.jpeg";
import AxiosApi from "../api/AxiosApi";
import rightarrow from "../images/rightarrow.png"
import MyWish from "./MyWish";
import MyClass from "./MyClass";
import MyReview from "./MyReview";
import MySubs from "./MySubs";
import MyOrder from "./MyOrder";
import Header from "./Header";
import Footer from "./Footer";
import ClassSection from "./MyClassSection";
import { UserContext } from "../context/UserStore";
import MyCart from "./MyCart";

const BodyContainer = styled.div`
  width: 100vw;
`;
const Container = styled.div`
  padding: 130px;
  display: flex;
  flex-direction: row;
`;

const SideBar = styled.div`
  margin-right: 50px;
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const IdList = styled.div`
  position: relative;
  font-weight: bold;
  font-size: 1.5em;
  margin-bottom: 100px;

  span {
    font-size: 0.6em;
    font-weight: normal;
    color: gray;
  }

  img {
    position: absolute;
    width: 18px;
    height: 18px;
    top: 40px;
  }
`;

const List = styled.div`
  li {
    cursor: pointer;
    list-style: none;
    margin: 20px 0;
    &:nth-child(1) {
      font-weight: bold;
      font-size: 1.3em;
      margin-bottom: 35px;
    }
    &:nth-child(2) {
      color: #6E6E6E;
      font-size: .9em;
    }
    &:nth-child(3) {
      color: #6E6E6E;
      font-size: .9em;
      
    }
    &:nth-child(4) {
      color: #6E6E6E;
      font-size: .9em;
      margin-bottom: 50px;
      
    }
    &:nth-child(5) {
      font-weight: bold;
      font-size: 1.3em;
      margin-bottom: 35px;
    }
    &:nth-child(6) {
      color: #6E6E6E;
      font-size: .9em;
    }
    &:nth-child(7) {
      color: #6E6E6E;
      font-size: .9em;
      margin-bottom: 60px;
    }
    &:nth-child(8) {
      font-weight: bold;
      font-size: 1.3em;
      margin-bottom: 35px;
    }
    &:nth-child(9) {
      color: #6E6E6E;
      font-size: 0.9em;
      margin-bottom: 50px;
    }
    &:nth-child(10) {
      font-weight: bold;
      font-size: 0.9em;
    }
  }
`;

const Banner = styled.div`
  width: 100%;
  height: 100px;
  border: none;
  margin-bottom: 65px;
  background-image: url(${banner2});
  background-size: cover;
  background-position: center;
;`

const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;


const Mypage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selected = location?.state?.selected || "메인";

  const context = useContext(UserContext);
  const { setUserId, userId } = context;

  const [memberInfo, setMemberInfo] = useState("");
  const [selectedInfo, setSelectedInfo] = useState(selected || "메인");

  const click = (menu) => {
    setSelectedInfo(menu);
  };

  useEffect(() => {
    console.log(selectedInfo);
  }, [selectedInfo]);

   useEffect(() => {
    const memberInfo = async() => {
      const rsp = await AxiosApi.myInfoGet(userId);
      if(rsp.status === 200) setMemberInfo(rsp.data);
    };
    memberInfo();
},[userId]);

  const logout = () => {
    setUserId("");
    navigate('/home');
  };

   return(
    <>
    <Header/>
    <BodyContainer>
    <Container>
      <SideBar>
        <IdList>
          <Link to="/Myedit" style={{ textDecoration: "none", color: "inherit"}}><div>{userId}님</div>  {/** 선택 시 회원 정보 창으로 넘어가게 */}
            {memberInfo && memberInfo.map(member => (<span key={member.id}>{member.mail}<img src={rightarrow} alt="우측화살표"></img></span>))}
          </Link>
        </IdList>
        <List>
          <div>
            <li>내 클래스</li>
            <li onClick={() => click("수강")}>수강 중인 클래스</li>
            <li onClick={() => click("위시")}>위시리스트</li>
            <li onClick={() => click("후기")}>내 후기</li>
            <li>내 정보</li>
            <li onClick={() => click("장바구니")}>장바구니</li>
            <li onClick={() => click("결제 내역")}>결제 내역</li>
            <li>구독권</li>
            <li onClick={() => click("구독권")}>내 구독권</li>
            <li onClick={logout}>로그아웃</li>
          </div>
        </List>
      </SideBar>
      <Section>
      <a href="https://www.naver.com/"
         target="_blank"
         rel="noopener noreferrer"><Banner></Banner></a>
         {selectedInfo === "메인" && <ClassSection />}
         {selectedInfo === "수강" && <MyClass />}
         {selectedInfo === "위시" && <MyWish />}
         {selectedInfo === "후기" && <MyReview />}
         {selectedInfo === "장바구니" && <MyCart />}
         {selectedInfo === "결제 내역" && <MyOrder />}
         {selectedInfo === "구독권" && <MySubs />}
      </Section>
    </Container>
    </BodyContainer>
    <Footer/>
    </>
   )
}

export default Mypage;