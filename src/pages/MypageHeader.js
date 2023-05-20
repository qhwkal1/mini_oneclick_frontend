import React from "react";
import styled from "styled-components";
import account from "../images/account.png";
import { Link } from "react-router-dom";

const Section = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;

  p {
    font-size: 1.2em;
    font-weight: bold;
  }
`;

const MypageHeader = () => {

  return(
    <>
    <Section>
        <Link to="/Home" style={{ textDecoration: "none", color: "inherit"}}>
          <div className="logo">
            <p>ONE Click</p>
          </div>
        </Link>
        <Link to="/MyPage" style={{ textDecoration: "none", color: "inherit"}}>
          <div>
            <img src={account} alt="계정 로고" style={{width: "25px", height: "25px"}}/>
          </div>
        </Link>
      </Section>
    </>
  );
};

export default MypageHeader;