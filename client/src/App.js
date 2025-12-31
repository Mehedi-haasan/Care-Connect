import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContentDetails from "./Components/ContantDetails/ContentDetails";
import Home from "./Components/Home/Home";
import ForgetPassword from "./Components/Login/ForgetPassword";
import Login from "./Components/Login/Login";
import Registration from './Components/Login/Registration';
import Footer from "./Share/Footer";
import Header from "./Share/Header";
import HospitalSearch from "./Components/FindDoctorHospital/HospitalSearch";
import Category from "./Components/Category/Category";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categorySlug" element={<Category />} /> {/* FIXED */}
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/content/details/:id" element={<ContentDetails />} />
        <Route path="/HospitalSearch" element={<HospitalSearch/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
