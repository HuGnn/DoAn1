import "babel-polyfill";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChangePass from "./pages/ChangePass.jsx";
import store from "./redux/store";
import router from "./router";
import "./sass/style.scss";

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => {
        return <route.component {...props} routes={route.routes} />;
      }}
    />
  );
}

function RouterApp() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/change-password/:token' component={ChangePass} />

        {router.map((route, index) => (
          <RouteWithSubRoutes key={index} {...route} />
        ))}
      </Switch>
    </BrowserRouter>
  );
}

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <RouterApp />
        <ToastContainer
          position='top-right'
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Provider>
    </React.StrictMode>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
