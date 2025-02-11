/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import style from "./category.module.css";
import arrowRight from "../../assets/images/arrowRight.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMenuCategories } from "../../store/actions/categoryThunk";

const Category = ({ isFull, name, link, background }) => {
  const { categories } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenuCategories());
  }, []);

  const filtered = categories?.menuCategories.filter(
    (category) => category.name == name
  )[0];

  return (
    <div
      className={`${isFull ? style.fullCategory : ""} ${style.category}`}
      style={{ backgroundImage: background }}
    >
      {filtered != undefined ? (
        <>
          <div className={style.info}>
            <h3>{filtered.name}</h3>
            <p>Məhsul sayı: {filtered.products}</p>
            <Link to={`products/${link}`}>
              Məhsullara keçid <img src={arrowRight} alt="Right Arrow" />
            </Link>
          </div>
          <img src={filtered.assets[0].url} alt="Category" />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Category;
