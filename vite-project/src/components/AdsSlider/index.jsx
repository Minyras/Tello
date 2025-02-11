/* eslint-disable react/no-unescaped-entities */
//import React from "react";
import { useState } from "react";
import Slider from "react-slick";
import style from "./adsSlider.module.css";
import iPhones from "../../assets/images/iPhone 12s.png";

const AdsSlider = () => {
  const [active, setActive] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    afterChange: (current) => setActive(current),
    customPaging: (i) => (
      <div className={`${active == i ? style.active : ""} ${style.sliderDot}`}>
        <button className={style.dot}></button>
      </div>
    ),
    responsive: [
      {
        breakpoint: 720,
        settings: {
          dots: false,
        },
      },
    ],
  };
  return (
    <Slider className={style.slider} {...settings}>
      <div className={style.slide}>
        <div className={style.left}>
          <h2>
            Buy & Sell
            <br />
            What's Now & Next
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis
            malesuada et leo faucibus
          </p>
        </div>
        <img src={iPhones} alt="iphone 12s" />
      </div>
      <div className={style.slide}>
        <div className={style.left}>
          <h2>
            Buy & Sell
            <br />
            What's Now & Next
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis
            malesuada et leo faucibus
          </p>
        </div>
        <img src={iPhones} alt="iphone 12s" />
      </div>
      <div className={style.slide}>
        <div className={style.left}>
          <h2>
            Buy & Sell
            <br />
            What's Now & Next
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis
            malesuada et leo faucibus
          </p>
        </div>
        <img src={iPhones} alt="iphone 12s" />
      </div>
    </Slider>
  );
};

export default AdsSlider;
