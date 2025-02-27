import React from "react";
import { Navbar, Nav, Container, NavDropdown, Button, Spinner } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { AppRoutes } from "../shared/models/app.routes";
import "./NavBar.css";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";
import { useUserContext } from "../context/UserContext";

const NavBar: React.FC = () => {
  const { t } = useTranslation();
  const { logout, user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const { handleUserLogout } = useUserContext();

  const handleLogin = async () => {
    await loginWithRedirect();
  };

  const handleLogout = async () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    await handleUserLogout();
  };

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        {/* Navbar Toggle (for mobile) */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navbar Content */}
        <Navbar.Collapse id="basic-navbar-nav">
          
          {/* Centered Menu in Collapsed Mode */}
          <Nav className="me-auto mx-auto d-flex align-items-center flex-column flex-lg-row text-center">
            <Nav.Link href={AppRoutes.Home} className="px-3">{t('navbar.home')}</Nav.Link>
            <Nav.Link href={AppRoutes.ContactUs} className="px-3">{t('navbar.contactMe')}</Nav.Link>
            {isAuthenticated && (
              <Nav.Link href={AppRoutes.Dashboard} className="px-3">{t('navbar.dashboard')}</Nav.Link>
            )}

            {/* Language Dropdown */}
            <NavDropdown
              title={<img src="/assets/globe.png" alt="Language Selector" style={{ height: "20px" }} />}
              id="language-dropdown"
              align="end"
              className="mt-2 mt-lg-0"
            >
              <NavDropdown.Item onClick={() => handleLanguageChange("en")}>English</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleLanguageChange("fr")}>Français</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Authentication Section */}
          <Nav className="d-flex flex-column align-items-center flex-lg-row">
            {isLoading ? (
              <Spinner animation="grow" variant="primary" />
            ) : isAuthenticated && user ? (
              <NavDropdown
                title={
                  <>
                    <img src={user.picture} alt={user.name} className="user-avatar" />
                    {" "}{user.name}
                  </>
                }
                id="user-dropdown"
                align="end"
                className="mt-2 mt-lg-0"
              >
                <NavDropdown.Item onClick={handleLogout}>{t("navbar.logout")}</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button onClick={handleLogin} variant="outline-dark" className="mt-2 mt-lg-0">
                {t("navbar.login")}
              </Button>
            )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
