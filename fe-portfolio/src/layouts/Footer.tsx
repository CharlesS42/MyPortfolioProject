import React from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer bg-light shadow-sm">
      <Container className="d-flex justify-content-between align-items-center py-3">
        <div>{t('copyright')}</div>
        <div className="social-icons">
          <a href="https://github.com/CharlesS42" target="_blank" rel="noopener noreferrer">
            <img src="/assets/icons/github.png" alt="GitHub" />
          </a>
          <a href="https://www.linkedin.com/in/charles-s%C3%A9guin-05a9b3327/" target="_blank" rel="noopener noreferrer">
            <img src="/assets/icons/linkedin.png" alt="LinkedIn" />
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;