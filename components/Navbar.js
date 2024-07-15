import React from 'react';
import { Navbar, Nav, Dropdown, DropdownButton } from 'react-bootstrap';

const AppNavbar = ({ recentlyViewed }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Weather App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <DropdownButton id="dropdown-basic-button" title="Visited Cities">
            {recentlyViewed && recentlyViewed.length > 0 ? (
              recentlyViewed.map((city, index) => (
                <Dropdown.Item key={index}>
                  {city}
                </Dropdown.Item>
              ))
            ) : (
              <Dropdown.Item disabled>No cities visited yet</Dropdown.Item>
            )}
          </DropdownButton>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
