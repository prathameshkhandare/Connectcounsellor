import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
import mind_logo from '../assets/Img/mind_logo.png'; // Adjust path as per your file structure

import 'bootstrap/dist/css/bootstrap.min.css';
import { redirect } from 'react-router-dom';

function CustomNavbar() {
  const [loggedIn, setLoggedIn] = useState(false); // State to manage login status

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get('/api/check-login-status');
      const isLoggedIn = response.data.isLoggedIn;
      setLoggedIn(isLoggedIn);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = () => {
  
  };

  const handleLogout = () => {
    axios.post('/api/logout')
     .then(() => {
        setLoggedIn(false);
      })
     .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar-bg" style={{ minHeight: '80px' }}>
      <Navbar.Brand>
        <img
          className='Logo-img'
          src={mind_logo}
          alt="Mind Logo"
          style={{ maxHeight: '60px', width: 'auto' }} // Adjust dimensions as needed
        />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav">
        <FontAwesomeIcon icon={faBars} />
      </Navbar.Toggle>

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto nav-elements mb-lg-0">
          <Nav.Link className='nav-element' href="#home">Home</Nav.Link>
          <Nav.Link className='nav-element' href="#aboutus">About us</Nav.Link>
          <Nav.Link className='nav-element' href="#contact">Contact</Nav.Link>
          <Nav.Link className='nav-element' href="#blog">Blog</Nav.Link>
          <Nav.Link className='nav-element' href="#booknow">Book Now</Nav.Link>
        </Nav>
      </Navbar.Collapse>

      <div className="right-nav-elements d-flex align-items-center">
      <Dropdown align="end">
  <Dropdown.Toggle variant="light" id="dropdown-basic" className="user-icon" as={(props) => (
    <Button {...props} className="dropdown-toggle" aria-label="User menu">
      <FontAwesomeIcon icon={faUser} />
    </Button>
  )} />

  <Dropdown.Menu>
    {loggedIn? (
      <>
        <Dropdown.Item href="#profile">Profile</Dropdown.Item>
        <Dropdown.Item href="#settings">Settings</Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
      </>
    ) : (
      <Dropdown.Item href='/login'>Login</Dropdown.Item>
    )}
  </Dropdown.Menu>
</Dropdown>
      </div>
    </Navbar>
  );
}

export default CustomNavbar;