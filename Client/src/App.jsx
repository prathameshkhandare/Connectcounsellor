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

import AccountSetting from "./Components/AccountSetting";
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
      <Banner />
      <h1>Book Now Page</h1>
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
          <Route
          path="/profile" element ={<> <CustomNavbar/><UserProfile/> <Footer/></>}></Route>
          <Route
          path="/AccountSetting" element ={<> <CustomNavbar/><AccountSetting/> <Footer/></>}></Route>
          <Route path="/booknow" element={<BookNow />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
