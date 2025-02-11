/* eslint-disable react/prop-types */
import style from "./sorting.module.css";
import sortingImage from "../../assets/images/sorting.svg";
import { useState } from "react";

const Sorting = ({ setSortBy, count }) => {
  const data = [
    { id: 0, value: "created.desc", label: "Ən yenilər" },
    { id: 1, value: "price.asc", label: "Ucuz-baha" },
    { id: 2, value: "price.desc", label: "Baha-ucuza" },
    { id: 3, value: "name.asc", label: "(A-Z)" },
    { id: 4, value: "name.desc", label: "(Z-A)" },
  ];
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => setIsShown(!isShown);

  const handleItemClick = (id) => {
    setSelectedItem(id);
    setIsOpen(!isOpen);
    setIsShown(!isShown);
    setSortBy(data.find((item) => item.id == id).value);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isShown, setIsShown] = useState(false);

  return (
    <div className={style.sorting}>
      <button onClick={toggleDropdown}>
        <img src={sortingImage} alt="Sort" />
        <p>Sıralama</p>
      </button>
      <p className={style.count}>
        {count == 0 || count == undefined
          ? "Məhsul tapılmadı"
          : `${count} məhsul tapıldı`}
      </p>
      <div className={`${style.dropdown} ${isShown && style.open}`}>
        <div
          className={style.dropdownHeader}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedItem
            ? data.find((item) => item.id == selectedItem).label
            : "Sıralama"}
          <img
            src="/next.svg"
            className={`${style.icon} ${isOpen && style.open}`}
          />
        </div>
        <div className={`${style.dropdownBody} ${isOpen && style.open}`}>
          {data.map((item) => (
            <div
              className={style.dropdownItem}
              onClick={(e) => handleItemClick(e.target.id)}
              key={item.id}
              id={item.id}
            >
              <span
                className={`${style.dropdownItemDot} ${
                  item.id == selectedItem && style.selected
                }`}
              >
                •{" "}
              </span>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sorting;
