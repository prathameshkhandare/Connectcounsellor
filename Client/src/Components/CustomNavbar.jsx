import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown, Badge, Popover, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faBell } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import mind_logo from '../assets/Img/mind_logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function CustomNavbar() {
  const [loggedIn, setLoggedIn] = useState(false); // Initial state is false
  const [scrolled, setScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    checkLoginStatus(); // Check login status on component mount
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const checkLoginStatus = async () => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    if (token) {
      try {
        // Send a request to backend to verify token and get user details
        const response = await axios.get('http://localhost:3000/api/check-login-status', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.isLoggedIn) {
          setLoggedIn(true); // Set logged in state to true if token is valid
        } else {
          setLoggedIn(false); // Set logged in state to false if token is not valid
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setLoggedIn(false); // Set logged in state to false on error or invalid token
      }
    } else {
      setLoggedIn(false); // No token found, set logged in state to false
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    setLoggedIn(false); // Set logged in state to false on logout
  };

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
  };

  const popover = (
    <Popover id="popover-notifications" className="notifications-popover">
      <Popover.Header as="h3" style={{ backgroundColor: 'black', color: 'white' }}>Notifications</Popover.Header>
      <Popover.Body style={{ maxHeight: '500px', overflowY: 'auto' }}>
        <p>You have new notifications:</p>
        <ul>
          <li>Notification 1: Lorem ipsum dolor sit amet.</li>
          <li>Notification 2: Consectetur adipiscing elit.</li>
          <li>Notification 3: Nulla vitae elit libero.</li>
        </ul>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
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
          <OverlayTrigger
            placement="bottom"
            overlay={popover}
            show={showNotifications}
            rootClose
            trigger="click"
          >
            <Badge pill className="notification-badge" onClick={handleNotificationsClick}>
              <FontAwesomeIcon icon={faBell} style={{ color: 'black' }} /> {/* Example notification count */}
            </Badge>
          </OverlayTrigger>

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
                  <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/account-setting">Account Setting</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/notifications">Notifications</Dropdown.Item>
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
    </>
  );
}

export default CustomNavbar;
