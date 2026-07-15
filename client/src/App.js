import { BrowserRouter, Route, Routes } from "react-router-dom";
import Category from "./Components/Category/Category";
import ContentDetails from "./Components/ContantDetails/ContentDetails";
import HospitalSearch from "./Components/FindDoctorHospital/HospitalSearch";
import DoctorListPage from "./Components/FindDoctorHospital/DoctorListPage";
import Home from "./Components/Home/Home";
import ForgetPassword from "./Components/Login/ForgetPassword";
import Login from "./Components/Login/Login";
import Registration from './Components/Login/Registration';
import Footer from "./Share/Footer";
import ScrollToTop from "./Share/ScrollToTop";
import Header from "./Share/Header";

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categorySlug" element={<Category />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/content/details/:id" element={<ContentDetails />} />
        <Route path="/HospitalSearch" element={<HospitalSearch/>} />
        <Route path="/DoctorListPage" element={<DoctorListPage />} />
      
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
