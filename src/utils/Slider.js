import React from 'react';
import Slider from 'react-slick';
import './slick.css';
import './slick-theme.css';
//123
const desc1 = <img src="https://cdn.class101.net/images/17f14836-85a3-4b50-bc4f-cfd47f64cc80/2048xauto.webp" alt="" />
const desc2 = <img src="https://cdn.class101.net/images/79fad2df-c8dc-4d18-82bd-619c8d15a8c4/2048xauto.webp" alt="" />
// const arrow = <img src="../images/rightarrow.png" alt="" />
function MySlider() {
  const settings = {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <button className="prev-arrow"></button>,
    nextArrow: <button className="next-arrow"></button>
  };

  return (
    <Slider {...settings}>
      <div className="slide-item">
        <div className="content">
          {desc1}
          <p>강의 내용 간략히 소개 하는 곳</p>
        </div>
      </div> 
       <div className="slide-item">
        <div className="content">
          {desc2}
          <p>강의 내용 간략히 소개 하는 곳</p>
        </div>
      </div>
      <div className="slide-item">
        <div className="content">
          {desc1}
          <p>강의 내용 간략히 소개 하는 곳</p>
        </div>
      </div>
      <div className="slide-item">
        <div className="content">
          {desc2}
          <p>강의 내용 간략히 소개 하는 곳</p>
        </div>
      </div>
       <div className="slide-item">
        <div className="content">
          {desc1}
          <p>강의 내용 간략히 소개 하는 곳</p>
        </div>
      </div>
      <div className="slide-item">
        <div className="content">
          {desc2}
          <p>강의 내용 간략히 소개 하는 곳</p>
        </div>
      </div>
    </Slider>
  );
}

export default MySlider;