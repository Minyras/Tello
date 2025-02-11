/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import style from "./searchcard.module.css";
import blackAzn from "../../assets/images/blackazn.svg";

const SearchCard = ({ image, id, title, price }) => {
  return (
    <Link to={`product/${id}`} className={style.searchCard}>
      <img src={image} alt="Product" />
      <div className={style.right}>
        <h5>{title}</h5>
        <p>
          {price}
          <img src={blackAzn} alt="Manat" />
        </p>
      </div>
    </Link>
  );
};

export default SearchCard;
