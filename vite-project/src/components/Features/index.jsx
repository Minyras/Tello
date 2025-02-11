import style from "./features.module.css";
import box from "../../assets/images/box.svg";
import creditCard from "../../assets/images/card.svg";
import medalStar from "../../assets/images/medal.svg";

const Features = () => {
  return (
    <div className={style.features}>
      <div className={style.feature}>
        <img src={box} alt="box" />
        <h3>Çatdırılma</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      </div>
      <div className={style.feature}>
        <img src={creditCard} alt="creditCard" />
        <h3>Kredit</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      </div>
      <div className={style.feature}>
        <img src={medalStar} alt="medalStar" />
        <h3>Zəmanət</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      </div>
    </div>
  );
};

export default Features;
