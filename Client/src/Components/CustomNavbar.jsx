import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import mind_logo from '../assets/Img/mind_logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';


function CustomNavbar() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    checkLoginStatus();
    
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
    <Navbar expand="lg" className={`navbar-bg ${scrolled ? 'navbar-scrolled' : ''}`} style={{ minHeight: '60px' }}>
      <Navbar.Brand>
        <img
          className='Logo-img'
          src={mind_logo}
          alt="Mind Logo"
          style={{ maxHeight: '60px', width: 'auto' }}
        />
      </Navbar.Brand>

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto nav-elements mb-lg-0">
          <Nav.Link as={Link} to="/" className='nav-element'>Home</Nav.Link>
          <Nav.Link as={Link} to="/aboutus" className='nav-element'>About us</Nav.Link>
          <Nav.Link as={Link} to="/contact" className='nav-element'>Contact</Nav.Link>
          <Nav.Link as={Link} to="/blog" className='nav-element'>Blog</Nav.Link>
          <Nav.Link as={Link} to="/booknow" className='nav-element'>Book Now</Nav.Link>
        </Nav>
      </Navbar.Collapse>

      <div className="right-nav-elements d-flex align-items-center">
        <Dropdown align="end">
          <Dropdown.Toggle variant="light" id="dropdown-basic" className="user-icon">
            <FontAwesomeIcon icon={faUser} />
          </Dropdown.Toggle>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <FontAwesomeIcon icon={faBars} />
          </Navbar.Toggle>

          <Dropdown.Menu>
            {loggedIn ? (
              <>
                <Dropdown.Item href="#profile">Profile</Dropdown.Item>
                <Dropdown.Item href="#settings">Settings</Dropdown.Item>
                <Dropdown.Item href="/help">Help</Dropdown.Item>
                
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
