/* eslint-disable react/prop-types */
import style from "./search.module.css";
import searchIcon from "../../assets/images/search.svg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSearchHistory } from "../../store/reducers/searchHistory";
import closeIcon from "../../assets/images/darkClose.svg";
import SearchList from "../SearchList";
import useDebounce from "../../hooks/useDebounce";
import { useNavigate } from "react-router-dom";

const Search = ({ searchRef }) => {
  const dispatch = useDispatch();
  const [isSearching, setIsSearching] = useState(false);

  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);

  const handleSearchFocus = () => {
    setIsSearching(true);
  };

  const closeSearch = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setIsSearching(false);
    }, 200);
  };

  const handleChange = () => {
    setSearch(searchRef.current.value);
  };

  const navigate = useNavigate();

  const handleForm = (e) => {
    if (e.keyCode === 13) {
      navigate(`/searchedProducts/${searchRef.current.value}`);
      dispatch(addSearchHistory(searchRef.current.value));
      searchRef.current.value = "";
      setSearch("");
    }
  };
  return (
    <div
      className={`${isSearching ? style.searching : ""} ${
        style.searchContainer
      }`}
    >
      <form>
        <div className={style.search}>
          <img
            src={searchIcon}
            alt="Search"
            className={style.searchIcon}
            onClick={() => searchRef.current.focus()}
          />
          <input
            type="search"
            placeholder="Axtarış..."
            ref={searchRef}
            onFocus={handleSearchFocus}
            onBlur={closeSearch}
            onChange={handleChange}
            onKeyUp={handleForm}
          />
        </div>
        <button className={style.close} onClick={closeSearch}>
          <img src={closeIcon} alt="Close" />
        </button>
      </form>
      <SearchList
        isSearching={isSearching}
        search={debounceSearch}
        handleForm={handleForm}
      />
    </div>
  );
};

export default Search;
