import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import { useDispatch, useSelector } from "react-redux";
import { makeCart } from "./store/actions/cartThunk";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import RestrictedLayout from "./components/RestrictedLayout";
import LoginConfirm from "./pages/LoginConfirm";
import AuthLayout from "./components/AuthLayout";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import { useEffect } from "react";
import { getCustomer } from "./store/actions/customerThunk";

function App() {
  const { cart } = useSelector((state) => state.cart);
  const { customerId } = useSelector((state) => state.customer);

  const dispatch = useDispatch();

  if (Object.values(cart).length === 0) {
    dispatch(makeCart({ submit: false }));
  }
  useEffect(() => {
    dispatch(getCustomer({ customerId: customerId }));
  }, [customerId]);

  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />}>
            <Route path=":category_slug" element={null} />
          </Route>
          <Route path="/searchedProducts/:query" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route element={<RestrictedLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login/confirm" element={<LoginConfirm />} />
          <Route path="/confirm/:token" element={<Home />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/user/orders" element={<Orders />} />
          <Route path="/user/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
