/* eslint-disable react/prop-types */
import style from "./menu.module.css";
import menuIcon from "../../assets/images/menu.svg";
import closeIcon from "../../assets/images/close.svg";
import searchIcon from "../../assets/images/blackSearch.svg";
import MenuItem from "../MenuItem";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMenuCategories } from "../../store/actions/categoryThunk";
import Loading from "../Loading";

const Menu = ({ searchRef }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = () => {
    setIsOpen((prev) => !prev);
    searchRef.current.focus();
  };

  const { categories, status } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenuCategories());
  }, []);

  if (status == "loading") {
    return <Loading />;
  }

  return (
    <>
      <button
        className={style.hamburger}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <img src={menuIcon} alt="Menu" />
      </button>
      <div className={`${isOpen ? style.openMenu : ""} ${style.menu}`}>
        <nav>
          <ul>
            {categories?.menuCategories
              ?.filter((category) => {
                return (
                  category.name != "Telefonlar" && category.name != "Smart Saat"
                );
              })
              .map((category) => {
                return category.children.length == 0 ? (
                  <MenuItem
                    name={category.name}
                    link={`products/${category.slug}`}
                    style={style}
                    key={category.id}
                  />
                ) : (
                  category.children.map((categoryChildren) => {
                    return (
                      <MenuItem
                        name={categoryChildren.name}
                        link={`products/${categoryChildren.slug}`}
                        style={style}
                        dropdownCategory={categoryChildren.slug}
                        key={categoryChildren.id}
                      />
                    );
                  })
                );
              })}
          </ul>
        </nav>
        <div className={style.phoneMenuHeader}>
          <div className={style.left}>
            <button
              className={style.close}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <img src={closeIcon} />
            </button>
            <Link to={"#"}>
              <h1 className={style.topHeader}>
                Project<span> X</span>
              </h1>
            </Link>
          </div>
          <button className={style.phoneSearch} onClick={handleSearch}>
            <img src={searchIcon} alt="Search" />
          </button>
        </div>
        <div className={style.phoneMenuFooter}>
          <Link to={"/login"} className={style.signIn}>
            Daxil Ol
          </Link>
          <Link to={"/register"} className={style.signUp}>
            Qeydiyyat
          </Link>
        </div>
      </div>
    </>
  );
};

export default Menu;
