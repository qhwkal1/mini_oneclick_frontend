import React from "react";
import styled from "styled-components";
import MyClassSection1 from "./MyClassSection1";
import MyClassSection2 from "./MyClassSection2";


const Container = styled.div` 
  width: 100%;
  position: relative;
  font-weight: bold;
  font-size: 1.3em;

  .top {
    /* align-items: center; */
  }
  
  .head {
    margin-bottom: 50px;
    }

  .arrow {
    position: absolute;
    top: 60px;
    right: 0px;
    float: right;
    /* margin-right: 30px; */
    img {
      padding: 5px;
      width: 10px;
      height: 10px;
      cursor: pointer;
    }
  }
  .arrow2 {
    position: absolute;
    bottom: 410px;
    right: 0px;
    float: right;
    /* margin-right: 30px; */
    img {
      padding: 5px;
      width: 10px;
      height: 10px;
      cursor: pointer;
    }
  }

  .no {
    width: 100%;
    text-align: center;
    margin: auto 0;
    font-size: 0.6em;
    color: darkgray;

    img {
      width: 20px;
      height: 20px;
    }
  }
`;

const MyClassSection = () => {
  return(
    <>
    <Container>
      <div>
        <MyClassSection1 />
        <MyClassSection2 />
      </div>
    </Container>
    </>
  );
};

export default MyClassSection;