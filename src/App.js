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

function NoMatch() {
  return (
    <div style={{ padding: 20 }}>
      <h2>404: Page Not Found</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/product-detail/:productId" element={<DetailProduct />} />
          <Route path="/order-confirmation" element={<OrderConfirm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notifications" element={<NoMatch/>} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
  );
}

export default App;
