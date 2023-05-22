import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import { UserContext } from "../context/UserStore";
import PageNation from "./PageNation";
import MyOrderPeriod from "./MyOrderPeriod";

const Container = styled.div`
  width: 100%;

  p {
    font-size: 1.3em;
    font-weight: bold;
  }

  hr {
    background-color: lightgray;
    border: .3px solid lightgray;
    margin-bottom: 20px;
  }

  li {
    font-size: 0.7em;
    color: darkgray;
  }
  .last-list {
    margin-bottom: 100px;
  }
  table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
  }

  button{
    font-size: 0.8em;
    font-weight: bold;
    border: 1px solid lightgray;
    border-radius: 3px;
    cursor: pointer;
    background-color: white;
    color: darkgray;
    padding: 5px 10px;
    margin-right: 10px;

    &:hover {
      background-color: lightgray;
      color: white;
    }
  }

  .unable {
    pointer-events: none;
  }

  th, td {
    padding: 20px;
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    font-size: .9em;
    &:nth-child(1) {
      width: 40%;
    }
    &:nth-child(2) {
      width: 20%;
    }
    &:nth-child(3) {
      width: 20%;
    }
    &:nth-child(4) {
      width: 20%;
      button {
        margin: 0;
      }
    }
  }

  tbody tr{
    
    &:hover{
    background-color: #F1F0F0;
   }
  }

  td {
    text-align: center;
    font-size: .75em;
    color: #636363;
  }

  td img {
      width: 50px;
      height: 50px;
      vertical-align: middle;
  }

  .classrow {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: start;
    align-items: center;
    font-size: .7em;
    color: #636363;

    img {
      margin-left: 50px;
    }

    p {
      margin-left: 30px;
    }
  }
`;

const MyOrder = () => {
  const context = useContext(UserContext);
  const { userId } = context;

  // 결제 정보 조회
  const [paymentInfo, setPaymentInfo] = useState([]);
  useEffect(() => {
    const paymentInfo = async() => {
      const response = await AxiosApi.paymentGet(userId);
      if(response.status === 200) setPaymentInfo(response.data);
    };
    paymentInfo();
  },[userId]);

  // 기간 별 결제 내역 조회
  const [filterInfo, setFilterInfo] = useState("");
  useEffect(() => {
    const currentDay = new Date();
    const cal = 24 * 60 * 60 * 1000;
    const filtered = paymentInfo.filter((item) => {
      const paymentDay = new Date(item.created);
      return currentDay.getTime() - paymentDay.getTime() <= 365 * cal;
    });
    setFilterInfo(filtered);
  }, [paymentInfo]);
  
  console.log(filterInfo);
  
  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1);
  const totalPages = Math.max(Math.ceil(filterInfo.length / itemsPerPage), 1);
  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;
  const currentItem = filterInfo.slice(firstItem, lastItem);
  const pageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  
  // 수강일 이후 환불 불가
  const isCancel = (created) => {
    const currentDate = new Date();
    const createdDay = new Date(created);
    console.log(currentDate > createdDay)
    return currentDate > createdDay;
  }

  return(
    <>
    <Container>
    <p>결제 내역</p>
    <hr />
    <li>결제 내역은 최근 1년을 기준으로 조회됩니다.</li>
    <li>결제 관련 상세 문의는 고객센터를 통해 빠른 처리를 도와드리겠습니다.</li>
    <li className="last-list">클래스 수강일 이후는 환불이 불가합니다.</li>
    <MyOrderPeriod paymentInfo={paymentInfo} filteredInfo={setFilterInfo}/>
    <table>
      <thead>
       <tr>
        <th>상품정보</th>
        <th>결제일자</th>
        <th>결제금액(인원)</th>
        <th>결제취소</th>
       </tr>
      </thead>
      <tbody>
      {currentItem.length === 0 ? (
        <tr>
         <td colspan="5" style={{textAlign: "center"}}>결제 내역이 없습니다</td>
        </tr>
      ) : (currentItem.map(payment => (
        <tr key={payment.num}>
          <td>
            <div className="classrow">
            <img src={payment.thum} alt="헬로" />
            <p>{payment.lectureName}</p>
            </div>
            </td>
          <td>{payment.created}</td>
          <td>{payment.price.toLocaleString()}원({payment.amount}인)</td>
          {isCancel(payment.created) ? 
          (<td><button className="unable">취소불가</button></td>) 
          : <td><button>결제취소</button></td>}
        </tr>
        )))}
      </tbody>
    </table>
    <PageNation currentPage={currentPage} totalPages={totalPages} onPageChange={pageChange} />
    </Container>
    </>
  )
}

export default MyOrder;