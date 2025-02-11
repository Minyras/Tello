/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Advertisement from "./Advertisement";
import appleLogo from "../assets/images/apple-logo.png";
import iPhoneAirTag from "../assets/images/iPhoneAirTag.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedProducts } from "../store/actions/productThunk";
import Loading from "./Loading";

const MenuItem = ({ name, link, style, dropdownCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedProducts } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getSelectedProducts({ order: "created", category: dropdownCategory })
    );
  }, []);

  if (status == "loading") {
    return <Loading />;
  }
  const filtered = selectedProducts.products?.filter(
    (selected) =>
      selected.order == "created" &&
      selected.category == dropdownCategory &&
      selected.length != 0
  )[0];
  return (
    <li
      className={`${isOpen ? style.openDropdown : ""} ${
        dropdownCategory && style.dropdown
      }`}
      onClick={() => {
        setIsOpen((prev) => !prev);
      }}
    >
      <NavLink to={link}>{name}</NavLink>
      {dropdownCategory && (
        <div className={`${isOpen ? style.open : ""} ${style.dropdownMenu}`}>
          <div className={style.leftPart}>
            <ul>
              {filtered != undefined ? (
                filtered.data?.map((product) => {
                  return (
                    <li key={product.id}>
                      <Link to={`/product/${product.id}`}>{product.name}</Link>
                    </li>
                  );
                })
              ) : (
                <div>Loading...</div>
              )}
            </ul>
          </div>
          <Advertisement
            isWhiteBack={false}
            logo={appleLogo}
            name="Airtag"
            price="79"
            message="Əşyalarınızı tapmağın super asan yolu."
            image={iPhoneAirTag}
            styleEx={{ maxWidth: "490px", fontSize: "1.5rem" }}
            link="#"
          />
        </div>
      )}
    </li>
  );
};

export default MenuItem;
