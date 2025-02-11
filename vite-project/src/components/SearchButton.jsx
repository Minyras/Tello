import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const SearchButton = ({ link, name }) => {
  return <Link to={link}>{name}</Link>;
};

export default SearchButton;
