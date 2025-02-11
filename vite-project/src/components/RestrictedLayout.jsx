import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useSelector } from "react-redux";

const RestrictedLayout = () => {
  const { token } = useSelector((state) => state.customer);

  return (
    <>
      <Header />
      {token != "" ? <Navigate to={"/"} /> : <Outlet />}
      <Footer />
    </>
  );
};

export default RestrictedLayout;
