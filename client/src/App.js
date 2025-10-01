import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContentDetails from "./Components/ContantDetails/ContentDetails";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Registration from './Components/Login/Registration';
import Footer from "./Share/Footer";
import Header from "./Share/Header";

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
           <Route path="/registration" element={<Registration />} />
        <Route path="/content/details/:id" element={<ContentDetails/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}

export default App;
