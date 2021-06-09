import React, {useState} from "react";
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";

export const NavBarComponent = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  const loggedIn = true;
  
  const toggle = () => setIsOpen(!isOpen);
  
  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Bank of Smoothstack</NavbarBrand>
        <NavbarToggler onClick={toggle}/>
        <Collapse isOpen={isOpen} navbar>
          
          <Nav className="ml-auto" navbar>
            {loggedIn ?
              <NavItem>
                <NavLink href="#">Logout</NavLink>
              </NavItem> : ''}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}
