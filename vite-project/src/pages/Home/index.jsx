import AdsSlider from "../../components/AdsSlider";
import ProductsContainer from "../../components/ProductsContainer";
import Advertisement from "../../components/Advertisement";
import appleLogo from "../../assets/images/apple-logo.png";
import iPhoneAirTag from "../../assets/images/iPhoneAirTag.jpg";
import iPhone11 from "../../assets/images/iphone11.jpeg";
import phoneback from "../../assets/images/phoneback.svg";
import watchback from "../../assets/images/watchback.svg";
import toshiba from "../../assets/images/toshiba.png";
import philips from "../../assets/images/philips.png";
import hp from "../../assets/images/hp.png";
import electrolux from "../../assets/images/electrolux.png";
import gorenje from "../../assets/images/gorenje.png";
import bosch from "../../assets/images/bosch.png";
import acer from "../../assets/images/acer.png";
import style from "./home.module.css";
import Category from "../../components/Category";
import Features from "../../components/Features";
import BrandsSlider from "../../components/BrandsSlider";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { createJWT } from "../../store/actions/customerThunk";

const brands = [
  {
    id: 1,
    img: toshiba,
    link: "#",
  },
  {
    id: 2,
    img: philips,
    link: "#",
  },
  {
    id: 3,
    img: hp,
    link: "#",
  },
  {
    id: 4,
    img: electrolux,
    link: "#",
  },
  {
    id: 5,
    img: gorenje,
    link: "#",
  },
  {
    id: 6,
    img: bosch,
    link: "#",
  },
  {
    id: 7,
    img: acer,
    link: "#",
  },
];

const Home = () => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (params.token != undefined) {
      toast.promise(dispatch(createJWT({ token: params.token })), {
        pending: "İstifadəçi hesaba daxil olur.",
        success: "İstifadəçi hesaba daxil oldu.",
        error: "İstifadəçi hesaba daxil ola bilmədi.",
      });
    }
  }, []);

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AdsSlider />
      <ProductsContainer
        title="Ən çox satılan məhsullar"
        link="products"
        order="sort_order"
      />
      <ProductsContainer
        title="Yeni gələn məhsullar"
        link="products"
        order="created"
      />
      <div className={style.adsContainer}>
        <Advertisement
          isWhiteBack={true}
          logo={appleLogo}
          message="iPhone 11. Rəngli. Güclü. Əsl sizə lazım olan."
          price="1519"
          loanPrice="127"
          image={iPhone11}
        />
        <Advertisement
          isWhiteBack={false}
          logo={appleLogo}
          message="Əşyalarınızı tapmağın super asan yolu."
          price="79"
          name="AirTag"
          image={iPhoneAirTag}
        />
      </div>
      <ProductsContainer
        title="Yeni gələn aksessuarlar"
        link="products"
        order="created"
        category="accessories"
      />
      <div className={style.categories}>
        <Category
          name="Telefonlar"
          isFull
          link="telefonlar"
          background={`url(${phoneback})`}
        />
        <Category
          name="Smart Saatlar"
          link="smart-saatlar"
          background={`url(${watchback})`}
        />
        <Category
          name="Aksesuarlar"
          link="accessories"
          background={`url(${watchback})`}
        />
      </div>
      <Features />
      <BrandsSlider brands={brands} />
    </div>
  );
};

export default Home;
