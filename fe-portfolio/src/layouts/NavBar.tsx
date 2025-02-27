//import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Button, Spinner } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { AppRoutes } from "../shared/models/app.routes";
import "./NavBar.css"; 
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
import { useUserContext } from '../context/UserContext';

const NavBar: React.FC = () => {
  const { t } = useTranslation();

  const { logout, user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  const { handleUserLogout } = useUserContext();

  /*
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
  */

  const handleLogin = async () => {
    await loginWithRedirect();
  };

  const handleLogout = async () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    await handleUserLogout();
  };

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    console.log('Language changed to:', lng);
  }

  console.log("Current language:", i18n.language);

  //const normalizedRoles = roles.map((role) => role.toLowerCase());
  //const hasRole = (role: string) => normalizedRoles.includes(role.toLowerCase());
  //const isAdmin = hasRole('admin');

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={AppRoutes.Home} className="px-3">
              {t('navbar.home')}
            </Nav.Link>
            <Nav.Link href={AppRoutes.ContactUs} className="px-3">
              {t('navbar.contactMe')}
            </Nav.Link>
            {isAuthenticated && (
              <Nav.Link href={AppRoutes.Dashboard} className="px-3">
                {t('navbar.dashboard')}
              </Nav.Link>
            )}
            <NavDropdown
              title={
                <img
                  src="/assets/globe.png"
                  alt="Language Selector"
                  style={{ height: "20px" }}
                />
              }
              id="language-dropdown"
              align="end"
            >
              <NavDropdown.Item onClick={() => handleLanguageChange("en")}>
                English
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleLanguageChange("fr")}>
                Français
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
          {isLoading ? (
              <div className="loading-container">
                <Spinner
                  className="spinner-grow"
                  animation="grow"
                  variant="primary"
                />
              </div>
            ) : isAuthenticated && user ? (
              <NavDropdown
                title={
                  <>
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="user-avatar"
                    />{" "}
                    {user.name}
                  </>
                }
                id="user-dropdown"
                align="end"
              >
                <NavDropdown.Item onClick={handleLogout}>
                  {t("navbar.logout")}
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Button
                  onClick={handleLogin}
                  variant="outline-dark"
                  className="me-2"
                >
                  {t("navbar.login")}
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
/*
import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { AppRoutes } from "../shared/models/app.routes";
import "./NavBar.css";

const NavBar: React.FC = () => {
  const [, setLoading] = useState(false);
  const { logout, user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  const handleLoginRedirect = (): void => {
    setLoading(true);
    loginWithRedirect();
  };

  const handleLogout = (): void => {
    logout({ logoutParams: { returnTo: window.location.origin } });
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
            <Nav.Link href={AppRoutes.ContactUs} className="px-3">
              Contact Me
            </Nav.Link>
            {isAuthenticated && (
              <Nav.Link href={AppRoutes.Dashboard} className="px-3">
                Dashboard
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {isLoading ? (
              <span>Loading...</span>
            ) : isAuthenticated ? (
              <NavDropdown title={<img src={user?.picture} alt={user?.name} className="profile-icon" />} id="basic-nav-dropdown">
                <NavDropdown.ItemText>{user?.name}</NavDropdown.ItemText>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button variant="primary" onClick={handleLoginRedirect}>
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
*/