import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import wish from "../images/wish.png";
import Sidebar from "./Sidebar";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import slide1 from "../images/slide1.png";
import slide2 from "../images/slide2.png";
// import firebase from "firebase/compat";

const Box = styled.h3`
  margin-left: 100px;
  margin-right: 60px;
  margin-top: 40px;
  h3 {
    margin: 30px;
  }
`;

const Container1 = styled.div`
  margin: 60px;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  font-weight: bold;
  font-size: 1.3em;
  gap: 30px;
`;

const Container2 = styled.div`
  margin: 60px;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  font-weight: bold;
  font-size: 1.3em;
  gap: 30px;
`;

const SliderBox = styled.div`
  margin-bottom: 80px;
  margin-top: 80px;
`;

const LectureBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 240px;
  height: 290px;
  margin-bottom: 50px;
`;

const Wish = styled.div`
  position: absolute;
  top: 120px;
  right: 5px;
  img {
    width: 15px;
    height: 15px;
  }  
`;

const Thum = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 150px;
  object-fit: cover;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
`;

const Category1 = styled.div`
  margin: 0 0;
  font-size: 0.6rem;
  font-weight: normal;
  margin-top: 5px;
  color: gray;
`;

const Name1 = styled.p`
  font-size: .8rem;
  font-weight: bold;
  margin-top: 10px;
`;

const Intro1 = styled.p`
  font-size: 0.6rem;
  font-weight: normal;
  margin-top: 5px;
  color: gray;
`;

const Price1 = styled.p`
  position: absolute;
  bottom: 0;
  font-size: 0.7rem;
  font-weight: bold;
  margin-top: 35px;
`;

const Home = () => {
  const [bakingInfo, setBakingInfo] = useState("");
  const [downLectureInfo, setDownLectureInfo] = useState("");

  const slideSetting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  // 베이킹 추천 클래스
  useEffect(() => {
    const bakingInfo = async() => {
      const rsp = await AxiosApi.bakingGet("ALL");
      if(rsp.status === 200) setBakingInfo(rsp.data);
    };
    bakingInfo();
  }, []);

  console.log(downLectureInfo);

  // 좋아요 낮은 순
  useEffect(() => {
    const downLectureInfo = async() => {
      const rsp = await AxiosApi.downCountGet("ALL");
      if(rsp.status === 200) setDownLectureInfo(rsp.data);
    };
    downLectureInfo();
  }, []);

  const StyledImage = styled.img`
    width: 1000px; 
    height: 380px; 
    margin: auto;
    /* margin-bottom: 20px; */
  `;


  return (
    <>
      <Header />
      <Box>
        <SliderBox>
          <Slider {...slideSetting}>
            <div><StyledImage src={slide1} alt="슬라이드1" /></div>
            <div><StyledImage src={slide2} alt="슬라이드2" /></div>
          </Slider>
        </SliderBox>
        <Sidebar />
        <h3>추천 클래스</h3>
        <Container1>
        {downLectureInfo && downLectureInfo.map(lecture => (
            <LectureBox key={lecture.num}>
              <Wish><div><img src={wish} alt="찜" /></div></Wish>
              <Thum imageUrl={lecture.thum}></Thum>
              <Category1>{lecture.categoryName}</Category1>
              <Name1>{lecture.name}</Name1>
              <Intro1>{lecture.intro}</Intro1>
              <Price1>{lecture.price.toLocaleString()}원</Price1>
            </LectureBox>
          ))}
        </Container1>
        <h3>베이킹 추천 클래스</h3>
        <Container2>
          {bakingInfo && bakingInfo.map(item => (
            <LectureBox key={item.num}>
              <Wish><div><img src={wish} alt="찜" /></div></Wish>
              <Thum imageUrl={item.thum}></Thum>
              <Category1>{item.categoryName}</Category1>
              <Name1>{item.name}</Name1>
              <Intro1>{item.intro}</Intro1>
              <Price1>{item.price.toLocaleString()}원</Price1>
            </LectureBox>
          ))}
        </Container2>
      </Box>
      <Footer />
    </>
  );
};

export default Home;