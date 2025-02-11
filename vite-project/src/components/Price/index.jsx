import style from "./price.module.css";
import manat from "../../assets/images/blackazn.svg";
import redManat from "../../assets/images/redazn.svg";
import { useSelector } from "react-redux";

const Price = () => {
  const { cart } = useSelector((state) => state.cart);

  return (
    <div className={style.priceContainer}>
      <h2>Ümumi</h2>
      <ul>
        <li>
          <p>Məbləğ</p>
          <p className={style.price}>
            {cart?.subtotal?.formatted} <img src={manat} alt="Manat" />
          </p>
        </li>
        <li>
          <p>Çatdırılma</p>
          <p className={style.price}>
            0.00 <img src={manat} alt="Manat" />
          </p>
        </li>
        <li>
          <p>Hədiyyə paketi</p>
          <p className={style.price}>
            0.00 <img src={manat} alt="Manat" />
          </p>
        </li>
        <li>
          <p>Promo kod</p>
          <p className={style.price}>
            0.00 <img src={manat} alt="Manat" />
          </p>
        </li>
        <li className={style.divider}></li>
        <li>
          <p>Cəmi</p>
          <p className={style.price}>
            {cart?.subtotal?.formatted} <img src={redManat} alt="Manat" />
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Price;
