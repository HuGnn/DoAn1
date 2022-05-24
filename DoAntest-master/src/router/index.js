import AddToCart from "../pages/AddToCart.jsx";
import BuySuccess from "../pages/BuySuccess.jsx";
import ChangePass from "../pages/ChangePass.jsx";
import Detailbill from "../pages/DetailBill.jsx";
import ForgetPass from "../pages/ForgetPass.jsx";
import { HistoryOrder } from "../pages/HistoryBill.jsx";
import HomePage from "../pages/HomePage.jsx";
import Login from "../pages/Login.jsx";
import MenuPage from "../pages/MenuPage.jsx";
import Signup from "../pages/Signup.jsx";
import Admin from "../pages/Admin.jsx";
import AdminBill from "../pages/AdminBill.jsx";

const router = [
  {
    path: "/",
    name: "Home Page",
    exact: true,
    component: HomePage,
    routes: [],
  },
  {
    path: "/menu",
    name: "Menu Page",
    exact: true,
    component: MenuPage,
    routes: [],
  },
  {
    // path: "/login/:path",
    path: "/login",
    name: "Login Page",
    exact: false,
    component: Login,
    routes: [
      {
        path: "/login/test",
        component: HomePage,
      },
    ],
  },
  {
    path: "/signup",
    name: "Signup Page",
    exact: true,
    component: Signup,
    routes: [],
  },
  {
    path: "/forget-password",
    name: "Forget Page",
    exact: true,
    component: ForgetPass,
    routes: [],
  },
  // {
  //   path: "/change-password/:token",
  //   // path: "/change-password",
  //   name: "Change Pass Page",
  //   exact: true,
  //   component: ChangePass,
  //   routes: [],
  // },
  {
    path: "/add-to-cart",
    name: "Add To Cart Page",
    exact: true,
    component: AddToCart,
    routes: [],
  },
  {
    path: "/add-to-cart-success",
    name: "Success Page",
    exact: true,
    component: BuySuccess,
    routes: [],
  },
  {
    path: "/history-receipt",
    name: "History bill Page",
    exact: true,
    component: HistoryOrder,
    routes: [],
  },
  {
    path: "/detail-receipt",
    name: "History bill Page",
    exact: true,
    component: Detailbill,
    routes: [],
  },
  {
    path: "/admin/product",
    name: "Admin - PRODUCT",
    exact: true,
    component: Admin,
    routes: [],
  },
  {
    path: "/admin/bill",
    name: "Admin - BILL",
    exact: true,
    component: AdminBill,
    routes: [],
  },
];
export default router;
