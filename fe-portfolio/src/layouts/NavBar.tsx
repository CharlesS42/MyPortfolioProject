import React from "react";
import {
  Navbar,
  Nav,
  Container,
} from "react-bootstrap";
import { AppRoutes } from "../shared/models/app.routes";
import "./NavBar.css";

const NavBar: React.FC = () => {

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={AppRoutes.Home} className="px-3">
              Home
            </Nav.Link>
            <Nav.Link href={AppRoutes.Dashboard} className="px-3">
              Dashboard
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
