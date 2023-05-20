// 일반 강의 결제 모듈
import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext  } from "../context/UserStore";
import AxiosApi from "../api/AxiosApi";
import { useNavigate } from "react-router-dom";

const PayBtn = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  background-color: #FC7373;
  color: white;
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  /* 모바일 */
  @media (max-width: 768px) {
      width: 100%;
  }`;


const OrdinaryPayment = () => {
    const { userName, phone, mail, memberNum } = useContext(UserContext);

    const navigate = useNavigate(); // 결제성공시 결제완료 페이지로

    const onClickPayment = async() => {
        console.log(userName);
        console.log(phone);
        console.log(memberNum);

        // IMP 객체 가져오기
    const { IMP } = window;
    // IMP 객체 초기화
    IMP.init("imp25734285"); // 테스트가맹점

    try {
        // 사용자 등록 정보
        await IMP.certification({
            merchant_uid: "mid_" + new Date().getTime(),
            company: "OneClick",
            phone: phone,
        });
        const data = {
            pg: "kakao",
            pay_method: "kakaopay",
            merchant_uid: `mid_${new Date().getTime()}`,
            amount: 1000, // 강의에서 떙겨온 가격 넣을예정
            name: "OneClick 강의", // 강의에서 떙겨온 이름 넣을예정
            buyer_name: userName,
            buyer_tel: phone,
            buyer_email: mail,
            memberNum: memberNum, 
            lectureNum: 1 // 임시더미데이터 수정예정(강의코드 받으면 contextapi로 가져올예정)
          };
          // 결제 창 호출
          IMP.request_pay(data, callback);
        } catch (e) {
          console.error(e);
        }
      };  
      const callback = async (response) => {
        const { success, error_msg } = response;
        if (success) {
          alert("결제 완료");
        //   console.log(price); // 강의에서 가격 받아와서 context api에 담아서 날릴예정
          console.log(userName);
          console.log(phone);
          console.log(mail);
          console.log(memberNum);

          try {
            await AxiosApi.paymentInsert(1, memberNum, response.merchant_uid); // 여기 추가
            // 강의에서 가져온 가격만 들어가면됩니다!
            navigate("/PayComplite");
          } catch(e) {
            console.error(e);
            console.log(e);
          }
        } else {
          alert(`결제 실패 : ${error_msg}`);
        //   navigate("/PayComplite") 테스트용.. pg사 설정오류.. ㅠ
        }
      };

      

    return(
        <>
            <PayBtn onClick={onClickPayment}>결제하기</PayBtn>
        </>
    );
};

export default OrdinaryPayment;