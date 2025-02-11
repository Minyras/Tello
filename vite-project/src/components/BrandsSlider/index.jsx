/* eslint-disable react/prop-types */
//import React from 'react'
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { Component, useState } from "react";
import style from "./brandSlider.module.css";

class CustomSlide extends Component {
  render() {
    const { to, className, img } = this.props;
    return (
      <Link to={to} className={className}>
        <img src={img} alt="Brands" />
      </Link>
    );
  }
}
const BrandsSlider = ({ brands }) => {
  const [active, setActive] = useState(0);
  const settings = {
    dots: true,
    infinite: false,
    autoplay: true,
    speed: 500,
    slidesToShow: 6,
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
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };
  return (
    <Slider className={`brands ${style.brands}`} {...settings}>
      {brands.map((brand) => {
        return (
          <CustomSlide
            key={brand.id}
            to={brand.link}
            img={brand.img}
            className={style.brand}
          />
        );
      })}
    </Slider>
  );
};

export default BrandsSlider;
