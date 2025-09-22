import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Share/Footer";
import Header from "./Share/Header";
import Home from "./Components/Home/Home";
import ContentDetails from "./Components/ContantDetails/ContentDetails";
import Login from "./Components/Login/Login";
import Registration from './Components/Login/Registration'

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
