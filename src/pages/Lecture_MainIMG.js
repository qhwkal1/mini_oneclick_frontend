import React from "react";
import styled from "styled-components";


// 수강 설명 이미지
const detailImg1 = <img className="detail img1" src="https://cdn.class101.net/images/aaac23bf-682b-4e06-bfaa-e0c5a1d5bf9a/2048xauto.webp" alt="그림1" />
const detailImg2 = <img className="detail img2" src="https://cdn.class101.net/images/bd6763f2-5fe4-4e20-93b5-586ede7b4515/2048xauto.webp" alt="그림2" />
const detailImg3 = <img className="detail img3" src="https://cdn.class101.net/images/cf838d00-61ce-440b-8ebc-cb22483fc925/960xauto.webp" alt="그림3" />
const detailImg4 = <img className="detail img4" src="https://cdn.class101.net/images/6bedd4fb-2713-4b40-b64b-4f6e6246cbd6/960xauto.webp" alt="그림4" />


const ClassImg = styled.div`
  /* width: auto; */
  height: 400px;
  width: 96%;
  margin: 16px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  align-self: center;
  img {
    box-sizing: border-box;
    object-fit: cover;
    margin: 5px;
    display: flex;
    height: 100%;
    width: 23%;
    transition: width 2s ease;
  }
  img:nth-child(1n):hover {
    /* overflow: hidden; */
    width: 100%;
    transform: scaleX(1);
    transform-origin: bottom left;
  }
  img:nth-child(4):hover {
    /* overflow: hidden; */
    width: 100%;
    transform-origin: bottom right;
  }
  .title {
    width: auto;
  }
`
const MainIMG = () => {

  return (
    <ClassImg>
      {detailImg1}
      {detailImg2}
      {detailImg3}
      {detailImg4}
    </ClassImg>
  )
}

export default MainIMG;