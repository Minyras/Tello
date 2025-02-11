/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import style from "./productscontainer.module.css";
import Card from "../Card";
import nextIcon from "/next.svg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedProducts } from "../../store/actions/productThunk";
import Loading from "../Loading";

const ProductsContainer = ({ title, link, order, category }) => {
  const { selectedProducts } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const filtered = selectedProducts?.products?.filter(
    (selected) =>
      selected.order == order &&
      selected.category == category &&
      selected.length != 0
  )[0];

  useEffect(() => {
    dispatch(getSelectedProducts({ order: order, category: category }));
  }, []);

  return (
    <div className={style.products}>
      <h4>{title}</h4>
      <div className={style.cards}>
        {filtered != undefined ? (
          filtered.data?.map((product) => {
            return (
              <Card
                key={product.id}
                id={product.id}
                price={product.price.formatted}
                name={product.name}
                image={product.image.url}
              />
            );
          })
        ) : (
          <>
            <Loading />
          </>
        )}
      </div>
      <Link to={link} className={style.allButton}>
        Hamısına bax <img src={nextIcon} />
      </Link>
    </div>
  );
};

export default ProductsContainer;
