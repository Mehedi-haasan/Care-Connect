import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Category from "./Components/Category/Category";
import ContentDetails from "./Components/ContantDetails/ContentDetails";
import Hospitals from "./Components/FindDoctorHospital/Hospitals";
import Doctors from "./Components/FindDoctorHospital/Doctors";
import Home from "./Components/Home/Home";
import ForgetPassword from "./Components/Login/ForgetPassword";
import Login from "./Components/Login/Login";
import Registration from './Components/Login/Registration';
import Footer from "./Share/Footer";
import ScrollToTop from "./Share/ScrollToTop";
import Header from "./Share/Header";
import Appoinment from "./Components/Appoinment/Appoinment";
import PaymentSuccess from './Components/Payment/Success'
import PaymentFailed from './Components/Payment/Failed'
import PaymentCancel from './Components/Payment/Cancel'
import Profile from "./Components/Profile/Profile";

function App() {


  const [auth, setAuth] = useState(false)
  const [info, setInfo] = useState({});

  useEffect(() => {

    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const image = localStorage.getItem('image');
    const role = localStorage.getItem('role');


    if (token && token !== "null") {
      setAuth(true);
      setInfo({
        name: name,
        image: image,
        role: role,
      })
    } else {
      setAuth(false)
    }
  }, [auth])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header auth={auth} info={info} isLoggedOut={(v) => setAuth(v)}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/content/details/:id" element={<ContentDetails />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/appoinment/:doctor_id/:hospital_id" element={<Appoinment />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/failed" element={<PaymentFailed />} />
        <Route path="/payment/cancel" element={<PaymentCancel />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
