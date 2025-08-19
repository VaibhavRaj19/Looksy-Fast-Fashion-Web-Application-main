import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./Components/Administration/Dashboard";
import AdminLogin from "./Components/Administration/AdminLogin";
import AdminRegistration from "./Components/Administration/AdminRegistration";

import Home from "./Components/UserInterface/Home";
import ProductList from "./Components/UserInterface/ProductList";
import SetProductDetails from "./Components/UserInterface/SetProductDetails";
import MyCart from "./Components/UserInterface/MyCart";
import Address from "./Components/UserInterface/AddAddress";
import PaymentGateway from "./Components/UserInterface/PaymentGateway";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminregister" element={<AdminRegistration />} />
        <Route path="/" element={<Home />} />
        <Route path="/productlist/:cid/:sid" element={<ProductList />} />
        <Route path="/setproductdetails" element={<SetProductDetails />} />
        <Route path="/mycart" element={<MyCart />} />
        <Route path="/address" element={<Address />} />
        <Route path="/paymentgateway" element={<PaymentGateway />} />
      </Routes>
    </Router>
  );
}

export default App;
