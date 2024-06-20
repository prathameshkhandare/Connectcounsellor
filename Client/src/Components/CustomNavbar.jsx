import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars,faUser } from '@fortawesome/free-solid-svg-icons';
import mind_logo from '../assets/Img/mind_logo.png'; // Adjust path as per your file structure

import 'bootstrap/dist/css/bootstrap.min.css';

function CustomNavbar() {
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
          <Nav.Link className='nav-element' href="#contact">About us</Nav.Link>
          <Nav.Link className='nav-element' href="#about">Contact</Nav.Link>
          <Nav.Link className='nav-element' href="#login">Blog</Nav.Link>
          <Nav.Link className='nav-element' href="#login">Book Now</Nav.Link>
        </Nav>
      </Navbar.Collapse>

      <div className="right-nav-elements d-flex align-items-center">
     
          <Button variant="light" className="search-button">
            <FontAwesomeIcon icon={faUser} />
          </Button>
       
      </div>
    </Navbar>
  );
}

export default CustomNavbar;
