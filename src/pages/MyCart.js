import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import { UserContext } from "../context/UserStore";

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

  table {
    width: 100%;
    margin-top: 100px;
    border-collapse: collapse;
  }
  th, td {
    padding: 20px;
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    font-size: .9em;
    &:nth-child(1) {
      width: 5%
    }
    &:nth-child(2) {
      width: 40%;
    }
    &:nth-child(3) {
      width: 15%;
    }
    &:nth-child(4) {
      width: 15%;
    }
    &:nth-child(5) {
      width: 15%;
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

    p {
      margin-left: 30px;
    }
  }

  button {
    font-size: 0.7em;
    font-weight: bold;
    margin-top: 20px;
    border: 1px solid lightgray;
    border-radius: 3px;
    cursor: pointer;
    background-color: white;
    color: darkgray;
    padding: 5px 10px;

    &:hover {
      background-color: lightgray;
      color: white;
    }
  }

  .pay-button {
    width: 100%;
    font-size: 1.1em;
    display: flex;
    justify-content: center;
  
    button {
      margin: 100px 0 0 0;
      font-weight: bold;
      color: white;
      background-color: #565656;
      border: none;
      width: 250px;
      height: 30px;

      &:hover {
        background-color: #FC7373;
        color: white;
      }
    }
  }

  .quantity-control {

    input {
      text-align: center;
      width: 25px;
      height: 20px;
      border: none;
      color: #636363;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    button {
      margin: 0;
    }
  }
`;

const MyCart = () => {
  const context = useContext(UserContext);
  const { userId } = context;

  // 내 장바구니 리스트 조회
  const [cartInfo, setCartInfo] = useState("");
  useEffect(() => {
    const cartInfo = async() => {
      const response = await AxiosApi.myCartGet(userId);
      if(response.status === 200) setCartInfo(response.data);
    };
    cartInfo();
  }, [userId]);

  // 체크박스 
  const [checkItems, setCheckItems] = useState([]);

  // 전체 체크박스
  const allCheck = (e) => {
    const isChecked = e.target.checked;
    setCheckItems(isChecked ? cartInfo.map(cart => cart.cartNum) : []);
  };

  // 개별 체크박스
  const singleCheck = (checked, id) => {
    if(checked) {
      setCheckItems((prevItems) => [...prevItems, id])
    } else {
      setCheckItems((prevItems) => prevItems.filter((item) => item !== id));
    }
  };

  // 체크박스 선택 삭제
  const selectDelete = async() => {
    const response = await AxiosApi.deleteCart(checkItems);
    console.log(response.data);
    if(response.data === true) {
      const updatedCartInfo = cartInfo.filter((cart) => !checkItems.includes(cart.cartNum));
      setCartInfo(updatedCartInfo);
      setCheckItems([]);
      }
    }

  // 인원 선택
  const decQuantity = (cartNum) => {
    setCartInfo((prevCartInfo) => {
      return prevCartInfo.map((cart) => {
        if (cart.cartNum === cartNum && cart.quantity > 1) {
          return { ...cart, quantity: cart.quantity - 1 };
        }
        return cart;
      });
    });
  };
  
  const incQuantity = (cartNum) => {
    setCartInfo((prevCartInfo) => {
      return prevCartInfo.map((cart) => {
        if (cart.cartNum === cartNum) {
          return { ...cart, quantity: cart.quantity + 1 };
        }
        return cart;
      });
    });
  };
    
  return(
    <>
    <Container>
      <p>장바구니</p> 
      <hr />
      <li>장바구니 내역은 1년을 기준으로 보관됩니다.</li>
      <li>마감된 원데이 클래스는 장바구니에서 자동으로 삭제됩니다.</li>
      <li>구독권으로 결제 시 1인 결제만 가능합니다.</li>
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" className="all-Check" 
            name='select-all'
            checked={checkItems.length === cartInfo.length}
            onChange={allCheck}/></th>
            <th>상품정보</th>
            <th>수강날짜</th>
            <th>결제금액</th>
            <th>인원</th>
          </tr>
        </thead>
        <tbody>
          {cartInfo.length === 0 ? (
            <tr>
             <td colspan="5" style={{textAlign: "center"}}>
              장바구니 내역이 없습니다
             </td>
            </tr>
          ) : (cartInfo.map(cart => (
          <tr key={cart.cartNum}>
            <td>
              <input type="checkbox" id={cart.cartNum} checked={checkItems.includes(cart.cartNum)}
              onChange={(e) => singleCheck(e.target.checked, cart.cartNum)} />
            </td>
            <td>
              <div className="classrow">
                <img src={cart.thum} alt="썸네일" />
                <p>{cart.lecName}</p>
              </div>
            </td>
            <td>{cart.startDate}</td>
            <td>{cart.price.toLocaleString()}원</td>
            <td>
              <div className="quantity-control">
                <button onClick={() => decQuantity(cart.cartNum)}>-</button>
                <span>
                <input type="number" value={cart.quantity} readOnly/>
                </span>
                <button onClick={() => incQuantity(cart.cartNum)}>+</button>
              </div>
            </td>
          </tr>
          )))}
        </tbody>
      </table>
      <button onClick={selectDelete}>선택 삭제</button>
      <div className="pay-button">
        <button>결제하기</button>
      </div>
    </Container>
    </>
  );
};

export default MyCart;