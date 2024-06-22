import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CustomNavbar from './Components/CustomNavbar';
import Banner from './Components/Banner';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Registration from './Components/Registration'
import Contactus from './Components/Contactus';
import Courses from './Components/Courses';
import Aboutus from './Components/Aboutus';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Example components for routes
const Home = () => {
  return (
    <>
      <CustomNavbar />
      <Banner />
      <Courses />
      <Footer />
    </>
  );
};


const Blog = () => {
  return (
    <>
      <CustomNavbar />
      <Banner />
      <h1>Blog Page</h1>
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
          <Route path="/aboutus" element={<><CustomNavbar /><Aboutus /><Footer /></>} />
          <Route path="/contact" element={<><CustomNavbar /><Contactus /><Footer /></>} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/booknow" element={<BookNow />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
