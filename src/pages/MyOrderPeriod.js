import React, { useEffect, useState } from "react";

const MyOrderPeriod = ({paymentInfo, filteredInfo}) => {
  const [period, setPeriod] = useState('1year');

  useEffect(() => {
    filterPeriod();
  },[period]);

  const filterPeriod = () => {
    const currentDay = new Date();
    const cal = 24 * 60 * 60 * 1000;
    let filtered = [];

    if(period === 'all') {
      filtered = paymentInfo;
    } else if(period === '1year') {
      filtered = paymentInfo.filter(item => {
        const paymentDay = new Date(item.created);
        return currentDay.getTime() - paymentDay.getTime() <= 365 * cal;
      });
    } else if(period === '3month') {
      filtered = paymentInfo.filter(item => {
        const paymentDay = new Date(item.created);
        return currentDay.getTime() - paymentDay.getTime() <= 90 * cal;
      });
    } else if(period === '6month') {
      filtered = paymentInfo.filter(item => {
        const paymentDay = new Date(item.created);
        return currentDay.getTime() - paymentDay.getTime() <= 180 * cal;
      });
    }
    filteredInfo(filtered);
  }

  const periodClick = (selectPeriod) => {
    setPeriod(selectPeriod);
    filterPeriod();
  }

  return(
    <>
    <div className="periodButton">
      <button onClick={() => periodClick('all')}>전체</button>
      <button onClick={() => periodClick('1year')}>1년</button>
      <button onClick={() => periodClick('3month')}>3개월</button>
      <button onClick={() => periodClick('6month')}>6개월</button>
    </div>
    </>
  );
};

export default MyOrderPeriod;
