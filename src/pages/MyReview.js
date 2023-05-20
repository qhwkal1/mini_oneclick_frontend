import React from "react";
import styled from "styled-components";
import MyReviewSection1 from "./MyReviewSection1";
import MyReviewSection2 from "./MyReviewSection2";

const Container = styled.div`
  width: 100%;
  
  h1 {
    margin-bottom: 50px;
  }

  .containerbox {
    display: flex;
    flex-direction: row;
  }
  .reviewbox {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 15px;

    width: 380px;
    height: 150px;
    border: 1px solid #D7D6D6;
    border-radius: 5px;
    margin-bottom: 50px;
  }

  .reviewhead {
    display: flex;
  }
  img {
    width: 70px;
    height: 70px;
  }

  .title {
    width: 75%;
    height: 70px;
    font-size: 0.8em;
    font-weight: bold;
    margin-left: 10px;
    p {
      &:nth-child(2) {
       position: absolute;
       top: 63px;
       font-size: 0.6em;
       color: darkgray;
      }
    }
  }

  .contents {
    margin-top: 10px;
    font-size: 0.7em;
    color: darkgray;
  }

  hr {
    background-color: lightgray;
    border: .3px solid lightgray;
  }
  
  button {
    position: absolute;
    bottom: 10px;
    right: 15px;
    /* border: none; */
    border: 1px solid lightgray;
    border-radius: 2px;
    width: 15%;
    background-color: white;
    color: darkgray;
    font-size: 0.7em;
    &:hover {
      background-color: lightgray;
      color: white;
      cursor: pointer;
    }
  }

  .buttonbox {
    margin-top: 10px;

    hr {
      background-color: lightgray;
      border: .3px solid lightgray;
    }
    button {
      bottom: 15px;
      width: 93%;
      height: 30px;
      background-color: #FC7373;
      border: none;
      color: white;
      font-weight: bold;
      &:hover {
        background-color: lightgray;
      }
    }
  }

  .no {
    width: 100%;
    text-align: center;
    margin: auto 0;
    font-size: 1em;
    color: darkgray;

    img {
      width: 20px;
      height: 20px;
    }
  }
`;

const MyReview = () => {

  return(
    <>
    <Container>
    <MyReviewSection1 />
    <MyReviewSection2 />
    </Container>
    </>
  )
}

export default MyReview;