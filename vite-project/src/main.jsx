import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { store } from "./store";
import { Provider } from "react-redux";
//import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
{
  /* <PersistGate persistor={persistor}>
<BrowserRouter>
  <App />
</BrowserRouter>
</PersistGate> */
}
