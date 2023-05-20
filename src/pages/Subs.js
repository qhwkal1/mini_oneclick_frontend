import React, { useState } from "react";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import Payment from "./Payment";


const Container = styled.div`
  background-color: #FEFDFD;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
  padding: 20px;
  width: 100%;

  /* 모바일 */
  @media (max-width: 768px) {
    padding: 10px;
    max-width: 100%;
  }
`;



const Subscriptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubscriptionContainer = styled.form`
  display: flex;
  align-items: center;
  margin: 10px;
`;

const SubscriptionLabel = styled.label`
  margin-left: 10px;
`;

const Price = styled.div`
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
`;

// const Button = styled.button`
//   margin-top: 20px;
//   padding: 10px 20px;
//   border: none;
//   background-color: #FC7373;
//   color: white;
//   font-weight: bold;
//   cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

//   /* 모바일 */
//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

const SpanStyle = styled.span`
  font-weight: .5rem;
  font-size: .5rem;
  color: gray;
`;

const Subs = () => {
  const [subscription, setSubscription] = useState("");
  const [price, setPrice] = useState(0);
  console.log(price);

  const handleSubscriptionChange = (e) => {
    const value = e.target.value;
    setSubscription(value);

    
    // const [subsType, setSubsType] = useState(""); 사용불가능..
    

    switch (value) {
      case "threeMonth":
        setPrice(300000);
        // subsType = "3개월";
        break;
      case "sixMonth":
        setPrice(600000);
        // subsType = "6개월";
        break;
      case "twelveMonth":
        setPrice(900000);
        // subsType = "12개월";
        break;
      default:
        setPrice(0);
        break;
    }
  }

  return(
    <Container>
      <h1 className="title">정기 구독권</h1>
      <Subscriptions>
        <SubscriptionContainer>
          <input
            type="checkbox"
            id="threeMonth"
            name="subscription"
            value="threeMonth"
            checked={subscription === "threeMonth"}
            onChange={handleSubscriptionChange}
          />
          <SubscriptionLabel htmlFor="threeMonth">3개월 구독권 <SpanStyle>(클릭시 할인금액 확인)</SpanStyle></SubscriptionLabel>
        </SubscriptionContainer>
        <SubscriptionContainer>
          <input
            type="checkbox"
            id="sixMonth"
            name="subscription"
            value="sixMonth"
            checked={subscription === "sixMonth"}
            onChange={handleSubscriptionChange}
          />
          <SubscriptionLabel htmlFor="sixMonth">6개월 구독권 <SpanStyle>(클릭시 할인금액 확인)</SpanStyle></SubscriptionLabel>
        </SubscriptionContainer>
        <SubscriptionContainer>
          <input
            type="checkbox"
            id="twelveMonth"
            name="subscription"
            value="twelveMonth"
            checked={subscription === "twelveMonth"}
            onChange={handleSubscriptionChange}
          />
          <SubscriptionLabel htmlFor="twelveMonth">12개월 구독권 <SpanStyle>(클릭시 할인금액 확인)</SpanStyle></SubscriptionLabel>
        </SubscriptionContainer>
      </Subscriptions>
      {price >= 0 && (
        <>
          <Price>{`${price.toLocaleString()} 원`}</Price>
          <Payment price={price}></Payment>
        </>
      )}
    </Container>
  );
};

export default Subs;