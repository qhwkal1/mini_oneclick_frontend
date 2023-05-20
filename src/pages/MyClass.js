import React from "react";
import styled from "styled-components";
import PartOfClass from "./MyPartOfClass";

const Container = styled.div`
  font-weight: bold;
  font-size: 1.3em;
  
  .head {
    margin-bottom: 50px;
    }
`;

const MyClass = () => {

   return(
   <>
   <Container>
      <p className="head">수강 중인 클래스</p>
      <PartOfClass />
    </Container>
   </>
   )
}

export default MyClass;