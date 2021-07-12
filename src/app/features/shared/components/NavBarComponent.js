import React, {useState} from "react";
import { useSelector } from "react-redux";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";

export const NavBarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const currentState = useSelector(state => state.login);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Bank of Smoothstack</NavbarBrand>
        <NavbarToggler onClick={toggle}/>
        <Collapse isOpen={isOpen} navbar>

          <Nav className="ml-auto" navbar>
            {currentState.isLoggedIn ?
              <NavItem>
                <NavLink href="#">Logout</NavLink>
              </NavItem> : ''}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}
