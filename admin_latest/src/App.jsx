import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Components/Share/Header.jsx'
import Footer from './Components/Share/Footer.jsx'
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import CreactProduct from "./Components/ProductCreate/CreactProduct.jsx";
import Product from './Components/Products/Products.jsx';
import Profile from "./Components/Profile/Profile.jsx";
import Login from "./Components/Login/Login.jsx";
import Registration from "./Components/Login/Registration.jsx";
import Notification from "./Components/Notification/Notification.jsx";
import Category from "./Components/Category/Category.jsx";
import State from "./Components/State/State.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import ForgetPassword from "./Components/Login/ForgetPassword.jsx";
import OtpVarification from "./Components/Login/OtpVarification.jsx";
import ContentType from "./Components/ContentType/ContentType.jsx";
import User from "./Components/User/User.jsx";
import Company from "./Components/Company/Company.jsx";
import Setting from "./Components/Setting/Setting.jsx";
import House from "./Components/Warehouse/House.jsx";
import CreateCategory from './Components/Category/CreateCategory.jsx'
import CreateContentType from "./Components/ContentType/CreateContentType.jsx";
import ProductUpdate from "./Components/Products/ProductUpdate.jsx";
import Division from './Components/Division/Division.jsx'
import english from './lang/en.json'
import bangla from './lang/bn.json'
import UpdateContentType from "./Components/ContentType/UpdateContentType.jsx";
import UpdateCategory from "./Components/Category/UpdateCategory.jsx";
import UpdateAttribute from "./Components/Division/UpdateAttribute.jsx";
import UpdateWarehouse from "./Components/Warehouse/UpdateWarehouse.jsx";
import UpdateUser from "./Components/User/UpdateUser.jsx";
import SubCategory from "./Components/SubCategory/SubCategory.jsx";
import CreateSubCategory from "./Components/SubCategory/CreateSubCategory.jsx";
import DivisionCreate from "./Components/Division/DivisionCreate.jsx";
import CreateDistrict from "./Components/Division/CreateDistrict.jsx";
import CreateUpazila from "./Components/Division/CreateUpazila.jsx";




function App() {
  const [auth, setAuth] = useState(false)
  const [open, setopen] = useState(true);
  const [info, setInfo] = useState({});
  const [data, setData] = useState([]);
  const [message, setMessage] = useState({ id: Date.now(), mgs: '' });
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [user, setUser] = useState([]);
  const [state, setState] = useState([]);
  const [shop, setShop] = useState([{ id: 1, name: "All" }])
  const [edition, setEdition] = useState([])
  let entries = [{ id: 501, name: "20" }, { id: 502, name: "30" }, { id: 503, name: "40" }, { id: 504, name: "50" }]
  const [lang, setLang] = useState({})




  useEffect(() => {

    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const image = localStorage.getItem('image');
    const role = localStorage.getItem('role');
    // const id = localStorage.getItem('id');
    // const usertype = localStorage.getItem('usertype');
    // const logo = localStorage.getItem('logo');
    // const shopname = localStorage.getItem('shopname');
    // const compId = localStorage.getItem('compId');
    // const shopcode = localStorage.getItem('shopcode');


    if (token && token !== "null") {
      setAuth(true);
      setInfo({
        // id: id,
        name: name,
        image: image,
        role: role,
        // usertype: usertype,
        // logo: logo,
        // shopname: shopname,
        // compId: compId,
        // shopcode: shopcode
      })
    } else {
      setAuth(false)
    }


    // if (auth && role === "superadmin") {
    //   getShop()
    // } else if (auth && role === "admin") {
    //   setShop([{
    //     id: id,
    //     name: shopname
    //   }])
    // }

    if (auth) {
      // getCategory();
      // getBrand()
      // getUser()
      // getState()
      // Edition()
    }

  }, [auth])



  useEffect(() => {
    let language = localStorage.getItem('lan');

    // If not set or invalid, default to English
    if (!language || language === 'undefined') {
      language = 'en';
      localStorage.setItem('lan', 'en');
    }

    if (language === 'en') {
      setLang(english);
    } else if (language === 'bn') {
      setLang(bangla);
    } else {
      setLang(english);
    }
  }, [lang]);



  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);




  return (
    <BrowserRouter>
      <Header auth={auth} isLoggedOut={(v) => setAuth(v)} open={open} isOpen={(v) => { setopen(v) }}
        darkMode={darkMode}
        notification={data} info={info} lang={lang}
        changetheme={(v) => {
          if (v === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
          } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
          }
        }}
        message={message}
        changeLan={(v) => { if (v === 'bn') { setLang(bangla) } else { setLang(english) } }} />
      <div className={`min-h-[calc(80vh-160px)] ${auth ? 'mt-12' : ''} bg-[#F7F7FF] dark:bg-[#040404] transition-all font-bold w-full top-12 ease-in duration-200 ${!auth ? "pl-0" : open ? "pl-[170px] md:pl-[230px]" : "pl-0 md:pl-[60px]"} font-roboto`}>
        <Routes>
          <Route path="/" element={auth ? <Dashboard data={data} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/dashboard" element={auth ? <Dashboard data={data} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/registration" element={auth && info?.role === "superadmin" ? <Registration state={state} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/forget/password" element={auth ? <ForgetPassword /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/OTP/varification" element={auth ? <OtpVarification /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/create" element={auth ? <CreactProduct edition={edition} category={category} brand={brand} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/update/product/:id" element={auth ? <ProductUpdate category={category} brand={brand} info={info} editio={edition} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/items" element={auth ? <Product category={category} brand={brand} entries={entries} shop={shop} user={user} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/notification" element={<Notification data={data} info={info} />} />


          <Route path="/company" element={<Company />} />


          <Route path="/app/setting" element={<Setting userinfo={info} />} />


          <Route path="/state" element={auth ? <State entries={entries} state={state} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/warehouses" element={auth ? <House entries={entries} shop={shop} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/update/warehouse/:id" element={auth ? <UpdateWarehouse entries={entries} shop={shop} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/category" element={auth ? <Category category={category} entries={entries} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/sub/category" element={auth ? <SubCategory category={category} entries={entries} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/create/sub/category" element={auth ? <CreateSubCategory category={category} entries={entries} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/content/type" element={auth ? <ContentType brands={brand} entries={entries} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />



          <Route path="/division" element={auth ? <Division /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/create/district" element={auth ? <CreateDistrict /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/create/upazila" element={auth ? <CreateUpazila /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/create/division" element={auth ? <DivisionCreate /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/update/attribute/:id" element={auth ? <UpdateAttribute brands={brand} entries={entries} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />



          <Route path="/create/category" element={auth ? <CreateCategory /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/update/category/:id" element={auth ? <UpdateCategory brands={brand} entries={entries} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/create/content/type" element={auth ? <CreateContentType /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/update/content/type/:id" element={auth ? <UpdateContentType brands={brand} entries={entries} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/profile/:id" element={auth ? <Profile /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/users" element={auth ? <User /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/update/user/:id" element={auth ? <UpdateUser entries={entries} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="*" element={<NotFound />} />

        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;


