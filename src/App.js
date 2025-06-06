// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
// Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import Home from './components/Pages/Home/Home';
import Login from './components/Pages/Login/Login';
import Order from './components/Pages/Order/Order';

import Register from './components/Pages/Register/Register';
import DetailProduct from "./components/Pages/DetailProduct/DetailProduct";
import OrderConfirm from "./components/Pages/OrderConfirm/OrderConfirm";

import { Routes, Route } from "react-router-dom";
import UserProfile from "./components/Pages/UserProfile/UserProfile";
import Notifications from "./components/Pages/Notifications/Notifications";
import Admin from "./components/Pages/Admin/Admin";
import { Link } from 'react-router-dom';
import OrderDetail from "./components/Pages/Admin/Orders/OrderDetail";
import OrderTable from "./components/Pages/Admin/Orders/OrderTable";
import ProductTable from "./components/Pages/Admin/Products/ProductTable";
import CategoryTable from "./components/Pages/Admin/Categories/CategoryTable";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import EmailForm from "./components/Pages/ForgetPassword/EmailForm";
import ResetPasswordForm from "./components/Pages/ForgetPassword/ResetPasswordForm";
import OAuth2RedirectHandler from "./components/OAuth2/OAuth2RedirectHandler";
import AdminProductDetail from "./components/Pages/Admin/Products/DetailProduct/AdminProductDetail";
import MyOrders from "./components/Pages/MyOrders/MyOrders";
import DiscountsTable from "./components/Pages/Admin/Discounts/DiscountsTable";
import ApplyDiscount from "./components/Pages/Admin/Discounts/ApplyDiscount/ApplyDiscount";


function NoMatch() {
  return (
    <div >
      <div className="d-flex align-items-center text-center error-page bg-primary pt-5 pb-4 h-100">
        <div className="row flex-grow">
          <div className="col-lg-8 mx-auto text-white">
            <div className="row align-items-center d-flex flex-row">
              <div className="col-lg-6 text-lg-right pr-lg-4">
                <h1 className="display-1 mb-0">404</h1>
              </div>
              <div className="col-lg-6 error-page-divider text-lg-left pl-lg-4">
                <h2>SORRY!</h2>
                <h3 className="font-weight-light">The page you’re looking for was not found.</h3>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-12 text-center mt-xl-2">
                <Link className="text-white font-weight-medium" to="/">Back to home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/order-confirmation/:id" element={<OrderConfirm />} />
        <Route path="/product-detail/:productId" element={<DetailProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<EmailForm />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/user-profile/:id" element={<UserProfile />} />
        <Route path="/my-orders/:userId" element={<MyOrders />} />
        <Route path="/admin" element={<Admin />} >
          <Route path="order" element={<OrderTable />} />
          <Route path="order/:id" element={<OrderDetail />} />
          <Route path="product" element={<ProductTable />} />
          <Route path="product/:id" element={<AdminProductDetail/>}/>
          <Route path="category" element={<CategoryTable />} /> 
          <Route path="discount">
            <Route index element={<DiscountsTable />} />
            <Route path="apply-discount" element={<ApplyDiscount />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
        <Route path="/user/forgot-password" element={<EmailForm />} />
        <Route path="/user/change-password" element={<ResetPasswordForm />} />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler/>}/>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
    </div>
  );
}

export default App;
