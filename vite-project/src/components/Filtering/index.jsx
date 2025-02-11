/* eslint-disable react/prop-types */
import Sorting from "../Sorting";
import Filter from "../Filter";
import style from "./filtering.module.css";

const Filtering = ({
  setPriceAbove,
  setPriceBelow,
  setSortBy,
  setCategories,
  setColors,
  count,
}) => {
  return (
    <div className={style.filtering}>
      <Sorting setSortBy={setSortBy} count={count} />
      <div className={style.divider}></div>
      <Filter
        setPriceAbove={setPriceAbove}
        setPriceBelow={setPriceBelow}
        setCategories={setCategories}
        setColors={setColors}
      />
    </div>
  );
};

export default Filtering;
