import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./Footer.css";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer bg-light shadow-sm">
      <Container className="py-3">
        <Row className="align-items-center text-center text-md-start">
          
          {/* Copyright (Stacks on small screens, left-aligns on larger screens) */}
          <Col xs={12} md={6} className="mb-3 mb-md-0">
            <div>{t("copyright")}</div>
          </Col>

          {/* Social Icons (Centers on mobile, aligns right on larger screens) */}
          <Col xs={12} md={6} className="d-flex justify-content-center justify-content-md-end gap-3">
            <a href="https://github.com/CharlesS42" target="_blank" rel="noopener noreferrer">
              <img src="/assets/icons/github.png" alt="GitHub" className="footer-icon" />
            </a>
            <a href="https://www.linkedin.com/in/charles-s%C3%A9guin-05a9b3327/" target="_blank" rel="noopener noreferrer">
              <img src="/assets/icons/linkedin.png" alt="LinkedIn" className="footer-icon" />
            </a>
          </Col>

        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
