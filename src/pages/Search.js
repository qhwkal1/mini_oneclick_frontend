import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import styled from "styled-components";
import wish from "../images/wish.png";
import Header from "./Header";
import Footer from "./Footer";

const Container = styled.div`
  margin: 60px;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  font-weight: bold;
  font-size: 1.3em;
  gap: 80px;
`;

const LectureBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 240px;
  height: 290px;
  /* border: 1px solid lightgray; */
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

const Category = styled.div`
  margin: 0 0;
  font-size: 0.6rem;
  font-weight: normal;
  margin-top: 5px;
  color: gray;
`;

const Name = styled.p`
  font-size: .8rem;
  font-weight: bold;
  margin-top: 10px;
`;

const Intro = styled.p`
  font-size: 0.6rem;
  font-weight: normal;
  margin-top: 5px;
  color: gray;
`;

const Price = styled.p`
  position: absolute;
  bottom: 0;
  font-size: 0.7rem;
  font-weight: bold;
  margin-top: 35px;
`;

const Search = () => {
  const { searchInput } = useParams();
  console.log(searchInput);
  const [searchLecture, setSearchLecture] = useState([]);

  useEffect(() => {
    const fetchLectureList = async() => {
      const rsp = await AxiosApi.lectureGet("ALL");
      if(rsp.status === 200) setSearchLecture(rsp.data);
    };
    fetchLectureList();
  }, []);

  return(
    <>
      <Header />
      <Container>
        {searchLecture
        .filter((item) => item.name.includes(searchInput))
        .map((item) =>(
          <LectureBox key={item.num}>
            <Wish><div><img src={wish} alt="찜" /></div></Wish>
            <Thum imageUrl={item.thum}></Thum>
            <Category>{item.category}</Category>
            <Name>{item.name}</Name>
            <Intro>{item.intro}</Intro>
            <Price>{item.price.toLocaleString()}원</Price>
          </LectureBox>
        ))}
      </Container>
      <Footer />
    </>
  );
};

export default Search;