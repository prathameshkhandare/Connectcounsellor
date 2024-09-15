import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown, Badge, Popover, OverlayTrigger,Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell,faBars } from '@fortawesome/free-solid-svg-icons';
import { Link ,useNavigate} from 'react-router-dom';
import CCLOGO3 from "../assets/Img/connectcounsellor.png"
import 'bootstrap/dist/css/bootstrap.min.css';

function CustomNavbar() {
  const [loggedIn, setLoggedIn] = useState(false); // Initial state is false
  const [scrolled, setScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showNavElements,setShowNavElements] = useState(false);
  
  const navigate = useNavigate();

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
    const token = localStorage.getItem('token');
    setLoggedIn(!!token); // Update loggedIn state based on token presence
  }

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    setLoggedIn(false); // Set logged in state to false on logout
    navigate('/'); // Navigate to home or login page
  };

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
  };

  const popover = (
    <Popover id="popover-notifications" className="notifications-popover">
      <Popover.Header
        as="h3"
        style={{ backgroundColor: 'black', color: 'white', position: 'relative' }}
      >
        Notifications
        {/* Close Button */}
        <Button
          variant="light"
          size="sm"
          onClick={handleNotificationsClick}
          style={{
            position: 'absolute',
            right: '10px',
            top: '5px',
            padding: '0',
            border: 'none',
            fontSize: '1.2rem',
            background: 'transparent',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          &times;
        </Button>
      </Popover.Header>
      <Popover.Body style={{ maxHeight: '500px', overflowY: 'auto' }}>
        <p>You have no new notifications</p>
        <ul></ul>
      </Popover.Body>
    </Popover>
  );

  // test 

  const toggleNavElements = () => {
    setShowNavElements(!showNavElements);
  };

  return (
    <>
      <Navbar expand="lg" className={`navbar-bg ${scrolled ? 'navbar-scrolled' : ''}`} style={{ minHeight: '60px' }}>
        <Navbar.Brand>
          <img
            className='Logo-img'
            src={CCLOGO3}
            alt="Mind Logo"
            style={{ maxHeight: '50px', width: 'auto' }}
          />
        </Navbar.Brand>

       

        <Navbar.Collapse id="basic-navbar-nav" className={`navbar-collapse ${showNavElements ? 'show' : ''} d-lg-flex`}>
          
          <Nav className="me-auto nav-elements mb-lg-0">
            <Nav.Link as={Link} to="/" className='nav-element'>Home</Nav.Link>
            <Nav.Link as={Link} to="/aboutus" className='nav-element'>About us</Nav.Link>
            <Nav.Link as={Link} to="/contact" className='nav-element'>Contact</Nav.Link>
            <Nav.Link as={Link} to="/blog" className='nav-element'>Blog</Nav.Link>
            <Nav.Link as={Link} to="/booknow" className='nav-element'>Book Now</Nav.Link>
            <Nav.Link as={Link}  to= "/courses" className='nav-element'>Courses</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <div className="right-nav-elements d-flex align-items-center">
          {loggedIn ? (
            <>
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
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/account-setting">Account Setting</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/notifications">Notifications</Dropdown.Item>
                  <Dropdown.Item href="/help">Help</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {/* for fabars test */}
              <div className="hamburger d-lg-none" onClick={toggleNavElements}>
          <FontAwesomeIcon icon={faBars} style={{ color: 'black', fontSize: '24px' }} />
        </div>

      {/* ----- */}
            </>
          ) : (
            <Nav.Link as={Link} to="/login"className="navbar-login-button">Login</Nav.Link>
          )}
        </div>
      </Navbar>
    </>
  );
}

export default CustomNavbar;
