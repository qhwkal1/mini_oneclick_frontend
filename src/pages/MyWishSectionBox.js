import React from "react";
import styled from "styled-components";
import redheart from "../images/redheart.png";


const Thumbnail = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 150px;
  object-fit: cover;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
`;

const Category = styled.p`
  margin: 0 0;
  font-size: 0.6rem;
  font-weight: normal;
  margin-top: 5px;
  color: gray;
`;

const Title = styled.h3`
  font-size: .8rem;
  font-weight: bold;
  margin-top: 10px;
`;

const Description = styled.p`
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

const Heart = styled.div`
  cursor: pointer;
  position: absolute;
  top: 120px;
  right: 5px;
  img {
    width: 15px;
    height: 15px;
  }  
`;

const MyWishSectionBox = ({myWish, cancleWish}) => {
  
  return(
    <>
    <div>
      <Heart><div><img src={redheart} alt="좋아요" onClick={() => cancleWish(myWish.num, myWish.wishNum)} /></div></Heart>
      <Thumbnail imageUrl={myWish.thum}></Thumbnail>
      <Category>{myWish.categoryName}</Category>
      <Title>{myWish.name}</Title>
      <Description>{myWish.intro}</Description>
      <Price>{myWish.price.toLocaleString()}원</Price>
    </div>
    </>
  )
}

export default MyWishSectionBox;