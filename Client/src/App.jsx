import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import CustomNavbar from "./Components/CustomNavbar";
import Banner from "./Components/Banner";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import Contactus from "./Components/Contactus";
import UserProfile from "./Components/UserProfile"
import AppointmentBooking from "./Components/AppointmentBooking";
import AccountSetting from "./Components/AccountSetting";
import Notifications from "./Components/Notifications";
// import UserCourses from "./Components/UserCourses";
import Courses from "./Components/Courses";
import Aboutus from "./Components/Aboutus";
import Blog from "./Components/Blog";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CookiePolicy from "./Components/footer/CookiePolicy";
import CourseInfo from "./Components/CourseInfo";
import PrivacyPolicy from "./Components/footer/PrivacyPolicy";
import RefundAndCancellationPolicy from "./Components/footer/RefundAndCancellationPolicy";
import TermsAndConditions from "./Components/footer/TermsAndConditions";
import DisclaimerPolicy from "./Components/footer/DesclaimerPolicy";
import AppInfo from "./Components/AppInfo";
import Help from "./Components/Help";
import AdminPanel from "./Components/AdminPanel/AdminPanel";
import CourseManagement from "./Components/AdminPanel/CourseManagement";
import BlogManagement from "./Components/AdminPanel/BlogManagement";
import PrivateRoute from "./Components/PrivateRoute";
import AdminBanner from "./Components/AdminPanel/AdminBanner";
import AppointmentsList from "./Components/AdminPanel/Appointment";
import ForgotPass from "./Components/ForgotPass";
import ResetPassword from "./Components/ResetPassword";
// Example components for routes
const Home = () => {
  return (
    <>
      <CustomNavbar />
      <Banner />
      <Courses />
      <AppInfo/>
      <Footer />
    </>
  );
};

const BookNow = () => {
  return (
    <>
      <CustomNavbar />
     
      <AppointmentBooking/>
      <Footer />
    </>
  );
};

function App() {
  return (
        <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/aboutus"
            element={
              <>
                <CustomNavbar />
                <Aboutus />
                <Footer />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <CustomNavbar />
                <Contactus />
                <Footer />
              </>
            }
          />
          <Route
            path="/blog"
            element={
              <>
                <CustomNavbar />
                <Blog />
                <Footer />
              </>
            }
          />
          <Route
            path="/courseInfo/:courseId"
            element={
              <>
                <CustomNavbar />
                <CourseInfo/>
                <Footer />
              </>
            }
          />
          <Route
            path="/cookiepolicy"
            element={
              <>
                <CustomNavbar />
                <CookiePolicy />
                <Footer />
              </>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <>
                <CustomNavbar />
                <PrivacyPolicy />
                <Footer />
              </>
            }
          />

          <Route
            path="/terms-conditions"
            element={
              <>
                <CustomNavbar />
                <TermsAndConditions />
                <Footer />
              </>
            }
          />
          <Route
            path="/refund-cancellation"
            element={
              <>
                <CustomNavbar />
                <RefundAndCancellationPolicy />
                <Footer />
              </>
            }
          />
          <Route
            path="/disclaimer-policy"
            element={
              <>
                <CustomNavbar />
                <DisclaimerPolicy />
                <Footer />
              </>
            }
            />
          <Route element={<PrivateRoute requiredRole="user" />}>
          <Route
          path="/profile" element ={<> <CustomNavbar/><UserProfile/> <Footer/></>}></Route>
          
          <Route
          path="/account-setting" element ={<> <CustomNavbar/><AccountSetting/> <Footer/></>}></Route>
          {/* <Route path = '/UserCourses' element = {<> <CustomNavbar/> <UserCourses/>  <Footer/> </>}></Route> */}
          <Route
         
          path="/Notifications" element ={<> <CustomNavbar/><Notifications/> <Footer/></>}></Route>
          <Route path="/booknow" element={<BookNow />} />
       
          </Route>
      
          <Route path="/Help" element={<>  <CustomNavbar /> <Help /> <Footer /> </> } />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute requiredRole="admin" />}>
            <Route path="/adminpanel" element={<>   <AdminPanel /> </> } />
            <Route path="/admin/courses" element={<>   <AdminPanel /> <CourseManagement/> </> } />
            <Route path="/admin/blogs" element={<>   <AdminPanel /> <BlogManagement/> </> } />
            <Route path="/admin/Appointment" element={<>   <AdminPanel /> <AppointmentsList/> </> } />
            <Route path="/admin-home" element={<>   <AdminPanel /> <AdminBanner /> </> } />
           </Route>
           <Route path="/forgotpassword" element={<ForgotPass/>} />
           <Route path="/register" element={<Registration />} />
           <Route path="/resetPassword" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
