import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const FooterStyled = styled.footer`
  width: 100%;
  position: relative;
  bottom: 0;
  font-size: 15px;
  margin-bottom: 10px;
  /* margin-left: 45px; */
  border-top: 1px solid lightgray;

  .pFooter {
    font-size: 11px;
    margin-left: 75px;
  }
  
  li {
    list-style: none;
  }

  button {
    width: 90px;
    height: 30px;
    border: 1px solid lightgrey;
    margin-left: 50px;
    background-color: white;
  }
`;

const Section = styled.ul`
  display: flex;
  flex-direction: row;
  line-height: 200%;
  margin-bottom: 50px;
  width: 60%;
  justify-content: space-between;

  .footer_link {
    text-decoration: none;
    color: inherit
  }

  li {
    font-size: 14px;
  }
`;

const Footer = () => {

  return(
    < FooterStyled>
      <footer>
        <div className="DivFooter">
          <Section>
              <ul> <b>ONE Click</b>
                <li><Link to="/" className="footer_link">공지사항</Link></li>
                <li><Link to="/" className="footer_link">서비스 소개</Link></li>
                <li><Link to="/" className="footer_link">채용</Link></li>
              </ul>
              <ul> <b>이용안내</b>
                <li><Link to="/" className="footer_link">클래스 가이드</Link></li>
                <li><Link to="/" className="footer_link">구독권 가이드</Link></li>
                <li><Link to="/" className="footer_link">제휴</Link></li>
              </ul>
              <ul> <b>정책</b>
                <li><Link to="/" className="footer_link">이용약관</Link></li>
                <li><Link to="/" className="footer_link">개인정보 처리방침</Link></li>
              </ul>
              <div>
                <ul> <b>고객지원</b>
                  <li>평일 9:00 ~ 16:00</li>
                </ul>
                <button>문의</button>
              </div>
          </Section>
          <p className="pFooter">
            <b>회사명</b> ONE Click <b>주소</b> 대한민국 서울시 마포구 월드컵로 12길 27 ONE Click <b>대표</b> 김대표 <b>사업자등록번호</b> 1234321 <b>이메일</b> oneclick@gmail.com <br />
            <b>통신판매업 신고번호</b> 2024-대한민국-4202 <b>대표번호</b> 02-1234-1234 <br />
            ONE Click은 통신판매중개자로서 중개하는 거래에 대하여 책임을 부담하지 않습니다.
          </p>
        </div>
      </footer>
    </FooterStyled>
  );
};

export default Footer;