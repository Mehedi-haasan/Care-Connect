import React,{useState} from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "./Components/Dashboard/Dashboard";
import ContentDetails from "./Components/Home/ContentDetails";
import ContentForm from "./Components/Home/ContentForm";
import EditContent from "./Components/Home/EditContent";
import Home from "./Components/Home/Home";
import Container from "./Container";
import HomeSections from "./Components/Contentposition/HomeSections";
import AllContentSection from "./Components/Contentposition/sections/AllContentSection";
import HealthProtection from "./Components/Contentposition/sections/HealthProtection";
import HomeContentSection from "./Components/Contentposition/sections/HomeContentSection";
import FeaturedSection from "./Components/Contentposition/sections/FeaturedSection";
import RecentHealth from "./Components/Contentposition/sections/RecentHealthSection";
import VideoAdmin from "./Components/videos/VideoAdmin";
import AdminLogin from "./Components/Login/AdminLogin";

/* 🔐 PRIVATE ROUTE */
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/admin/adminlogin" replace />;
};

function App() {
  const token = localStorage.getItem("token");
  const [auth, setAuth] = useState(false)
  const [open, setopen] = useState(true);
  return (
    // <BrowserRouter>
    //   <Routes>

    //     {/* ROOT REDIRECT */}
    //     <Route
    //       path="/"
    //       element={
    //         token
    //           ? <Navigate to="/dashboard" replace />
    //           : <Navigate to="/admin/adminlogin" replace />
    //       }
    //     />

    //     {/* LOGIN PAGE */}
    //     <Route path="/admin/adminlogin" element={<AdminLogin />} />

    //     {/* 🔐 PROTECTED ROUTES */}
    //     <Route
    //       element={
    //         <PrivateRoute>
    //           <Container />
    //         </PrivateRoute>
    //       }
    //     >
    //       <Route path="dashboard" element={<Dashboard />} />
    //       <Route path="admin/managecontent" element={<Home />} />
    //       <Route path="admin/content/create" element={<ContentForm />} />
    //       <Route path="admin/content/edit/:id" element={<EditContent />} />
    //       <Route path="createpost/:id" element={<ContentForm />} />
    //       <Route path="admin/details/:id" element={<ContentDetails />} />
    //       <Route path="admin/video" element={<VideoAdmin />} />

    //       {/* Nested Routes */}
    //       <Route path="admin/position_home" element={<HomeSections />}>
    //         <Route path="allcontent" element={<AllContentSection />} />
    //         <Route path="home_content" element={<HomeContentSection />} />
    //         <Route path="health_protection" element={<HealthProtection />} />
    //         <Route path="recent_health" element={<RecentHealth />} />
    //         <Route path="featured" element={<FeaturedSection />} />
    //       </Route>
    //     </Route>

    //   </Routes>
    // </BrowserRouter>

    <BrowserRouter>
      {/* <Header auth={auth} isLoggedOut={(v) => setAuth(v)} open={open} isOpen={(v) => { setopen(v) }}/> */}
      <div className={`min-h-[calc(80vh-160px)] ${auth ? 'mt-12' : ''} bg-[#F7F7FF] dark:bg-[#040404] transition-all font-bold w-full top-12 ease-in duration-200 ${!auth ? "pl-0" : open ? "pl-[170px] md:pl-[230px]" : "pl-0 md:pl-[60px]"} font-roboto`}>
        <Routes>

          {/* ROOT REDIRECT */}
          <Route
            path="/"
            element={
              token
                ? <Navigate to="/dashboard" replace />
                : <Navigate to="/admin/adminlogin" replace />
            }
          />

          {/* LOGIN PAGE */}
          <Route path="/admin/adminlogin" element={<AdminLogin />} />

          {/* 🔐 PROTECTED ROUTES */}
          <Route
            element={
              <PrivateRoute>
                <Container />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="admin/managecontent" element={<Home />} />
            <Route path="admin/content/create" element={<ContentForm />} />
            <Route path="admin/content/edit/:id" element={<EditContent />} />
            <Route path="createpost/:id" element={<ContentForm />} />
            <Route path="admin/details/:id" element={<ContentDetails />} />
            <Route path="admin/video" element={<VideoAdmin />} />

            {/* Nested Routes */}
            <Route path="admin/position_home" element={<HomeSections />}>
              <Route path="allcontent" element={<AllContentSection />} />
              <Route path="home_content" element={<HomeContentSection />} />
              <Route path="health_protection" element={<HealthProtection />} />
              <Route path="recent_health" element={<RecentHealth />} />
              <Route path="featured" element={<FeaturedSection />} />
            </Route>
          </Route>

        </Routes>
      </div>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
