// import React from 'react'
import style from "./footer.module.css";
import { Link } from "react-router-dom";
import instagramIcon from "../../assets/images/instagram.svg";
import facebookIcon from "../../assets/images/facebook.svg";
import youtubeIcon from "../../assets/images/youtube.svg";
import twitterIcon from "../../assets/images/twitter.svg";
import pinIcon from "../../assets/images/pin.svg";
import mailIcon from "../../assets/images/mail.svg";
import phoneIcon from "../../assets/images/phone.svg";
const Footer = () => {
  return (
    <footer>
      <div className={style.topFooter}>
        <div>
          <Link to={"/"} className={style.logo}>
            <img src="/icon.svg" />
          </Link>
          <div className={style.socialIcons}>
            <a href="#">
              <img src={instagramIcon} alt="Instagram" />
            </a>
            <a href="#">
              <img src={facebookIcon} alt="Facebook" />
            </a>
            <a href="#">
              <img src={youtubeIcon} alt="Youtube" />
            </a>
            <a href="#">
              <img src={twitterIcon} alt="Twitter" />
            </a>
          </div>
        </div>
        <div>
          <h3>Menu</h3>
          <ul>
            <li>
              <Link to={"/products/yeni"}>Yeni</Link>
            </li>
            <li>
              <Link to={"/products/discount"}>Endirimlər</Link>
            </li>
            <li>
              <Link to={"/products/accessories"}>Aksessuarlar</Link>
            </li>
            <li>
              <Link to={"/products"}>Bütün brendlər</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>Kömək</h3>
          <ul>
            <li>
              <Link to={"#"}>Tez-tez soruşulan suallar</Link>
            </li>
            <li>
              <Link to={"#"}>Çatdırılma xidməti</Link>
            </li>
            <li>
              <Link to={"#"}>Geri qaytarılma şərtləri</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>Əlaqə</h3>
          <ul className={style.contact}>
            <li>
              <img src={pinIcon} alt="Address" />
              <a href="#" className={style.address}>
                M. K. Ataturk avenue 89, Baku, Azerbaijan
              </a>
            </li>
            <li>
              <img src={mailIcon} alt="E-Mail" />
              <a href="mailto:example@gmail.com" className={style.email}>
                example@gmail.com
              </a>
            </li>
            <li>
              <img src={phoneIcon} alt="E-Mail" />
              <a href="tel:*2108" className={style.phone}>
                *2108
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={style.bottomFooter}>
        <p> &copy; ProjectX 2021. Bütün hüquqlar qorunur.</p>
        <div className={style.rightPart}>
          <Link to={"#"}>Qaydalar və şərtlər</Link>
          <Link to={"#"}>Məxfilik siyasəti</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
