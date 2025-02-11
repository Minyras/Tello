/* eslint-disable react/prop-types */
import style from "./card.module.css";
import redAzn from "../../assets/images/redazn.svg";
import grayAzn from "../../assets/images/grayazn.svg";
import blackAzn from "../../assets/images/blackazn.svg";
import { Link } from "react-router-dom";

const Card = ({ id, onSale, price, name, image }) => {
  return (
    <Link to={`/product/${id}`} className={style.card}>
      <img src={image} alt="Phone" />
      <h5>{name}</h5>
      <div className={style.price}>
        {onSale ? (
          <>
            <p className={style.oldPrice}>
              {onSale}
              <img src={grayAzn} alt="Manat" />
            </p>
            <p className={style.newPrice}>
              {price}
              <img src={redAzn} alt="Manat" />
            </p>
          </>
        ) : (
          <p className={style.onePrice}>
            {price}
            <img src={blackAzn} alt="Manat" />
          </p>
        )}
      </div>
    </Link>
  );
};

export default Card;
