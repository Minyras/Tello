/* eslint-disable react/prop-types */
import { usePagination, DOTS } from "../../hooks/usePagination";
import style from "./pagination.module.css";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={style.paginationContainer}>
      <li
        className={`${style.paginationItem} ${
          1 === currentPage ? style.disabled : ""
        }`}
        onClick={onPrevious}
      >
        <div className={`${style.arrow} ${style.left}`} />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={index} className={`${style.paginationItem} ${style.dots}`}>
              &#8230;
            </li>
          );
        }

        return (
          <li
            className={`${style.paginationItem} ${
              pageNumber === currentPage ? style.selected : ""
            }`}
            onClick={() => onPageChange(pageNumber)}
            key={pageNumber}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`${style.paginationItem} ${
          lastPage === currentPage ? style.disabled : ""
        }`}
        onClick={onNext}
      >
        <div className={`${style.arrow} ${style.right}`} />
      </li>
    </ul>
  );
};

export default Pagination;
