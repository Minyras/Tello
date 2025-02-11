import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";

const AuthLayout = () => {
  const { token } = useSelector((state) => state.customer);

  return (
    <>
      <Header />
      {token != "" ? (
        <div className="my-profile">
          <Sidebar />
          <Outlet />
        </div>
      ) : (
        <Navigate to={"login"} />
      )}
      <Footer />
    </>
  );
};

export default AuthLayout;
