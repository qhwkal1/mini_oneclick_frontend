import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import event1 from "../images/event1.png";
import event2 from "../images/event2.png";
import event3 from "../images/event3.png";

const EventBody = styled.div`
  margin-top: 70px;
  margin-bottom: 70px;
  img {
    width: 70%;
    margin: auto;
    display: block;
    margin-bottom: 40px;
    filter: drop-shadow(3px 3px 3px #000);
  }
`;

const Event = () => {
  return(
    <>
      <Header />
       <EventBody>
        <div><img src={event1} alt="배너1" /></div>
        <div><img src={event2} alt="배너1" /></div>
        <div><img src={event3} alt="배너1" /></div>
       </EventBody>
      <Footer />
    </>
  );
};

export default Event;