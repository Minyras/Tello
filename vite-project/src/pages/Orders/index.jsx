import style from "./orders.module.css";
import shoppingCart from "../../assets/images/gray-shopping-cart.svg";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";

const Orders = () => {
  const { orders, status } = useSelector((state) => state.customer);

  if (status == "loading") {
    return <Loading />;
  }

  return (
    <div className={style.orders}>
      {orders == undefined ? (
        <div className={style.emptyOrders}>
          <img src={shoppingCart} alt="Shopping Cart" />
          <p>Səbətinizdə hazırda heç bir sifarişiniz yoxdur</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Orders;
