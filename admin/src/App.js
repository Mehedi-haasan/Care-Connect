import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Components/Share/Header'
import Dashboard from "./Components/Dashboard/DashboardGraph";
import CreactProduct from "./Components/Home/CreactProduct";
import Product from './Components/Products/Products';
import DashboardGraph from "./Components/Dashboard/DashboardGraph";
import Container from "./Container";
import User from "./Components/User/User";
import Category from "./Components/Category/Category";
import ProductDetails from './Components/Products/ProductDetails'
import Order from "./Components/Order/Order";
import ProductEdit from "./Components/Products/ProductEdit";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/Login";
import { useState, useEffect } from "react";
import Registration from "./Components/Login/Registration";
import Carousel from "./Components/Carousel/Carousel";
import Hotsale from "./Components/Hotsale/Hotsale";
import Success from "./Components/Socket/Success.js";
import Notification from "./Components/Notification/Notification.js";
import Company from "./Components/Company/Company.js";
import State from "./Components/State/State.js";



const DashboardContainer = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/success" element={<Success />} />
        <Route path="/create" element={<CreactProduct />} />
        <Route path="/product" element={<Product />} />
        <Route path="/dashboard" element={<DashboardGraph />} />
        <Route path="/category" element={<Category />} />
        <Route path="/carousel" element={<Carousel />} />
        <Route path="/hotsale" element={<Hotsale />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/user" element={<User />} />
        <Route path="/details/:id" element={<ProductDetails />} />
        <Route path="/order" element={<Order />} />
        <Route path="/product/edit/:id" element={<ProductEdit />} />
        <Route path="/company/info" element={<Company />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/state" element={<State />} />
      </Routes>
    </Container>
  )
}


const AuthContainer = ({ auth }) => {
  return (
    <Routes>
      <Route path="/" element={<Login auth={auth} />} />
      <Route path="/registration" element={<Registration />} />
    </Routes>
  )
}


function App() {
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && token !== "null") {
      setAuth(true)
    } else {
      setAuth(false)
    }
  }, [])


  return (
    <BrowserRouter>
      <Header auth={auth} />
      {auth ? <DashboardContainer /> : <AuthContainer auth={() => setAuth(true)} />}
    </BrowserRouter>
  );
}

export default App;
