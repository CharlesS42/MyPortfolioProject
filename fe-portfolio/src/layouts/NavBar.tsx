import React, { useState } from 'react';
import {
  Navbar,
  Nav,
  Container,
} from "react-bootstrap";
import { AppRoutes } from "../shared/models/app.routes";
import "./NavBar.css";

const NavBar: React.FC = () => {

  const [, setLoading] = useState(false);

  const handleLoginRedirect = (): void => {
    setLoading(true);
    const audience = 'https://dev-cq56s7o31sbqbig8.us.auth0.com/api/v2/';
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;

    window.location.href =
      `https://dev-cq56s7o31sbqbig8.us.auth0.com/authorize?` +
      `response_type=token&` +
      `client_id=${clientId}&` +
      `redirect_uri=${redirectUri}&` +
      `scope=openid profile email read:current_user read:roles&` +
      `audience=${audience}&` +
      `prompt=login`;
  };

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
            <button onClick={handleLoginRedirect}>
              Login
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;