import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

function Navbar() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Home icon */}
        <Link to="/" className="navbar-logo" aria-label="Home">
          <span className="navbar-logo-circle">
            <svg
              className="navbar-logo-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5a1 1 0 0 1-1-1v-4.25h-3V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9.5z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>

        <div className="navbar-right">
          <div
            className="navbar-dropdown"
          >
            <button
              type="button"
              className="navbar-link navbar-dropdown-toggle"
              onClick={() => setToolsOpen((prev) => !prev)}
            >
              {t('navbar.tools')}
              <span
                className={`navbar-dropdown-arrow ${
                  toolsOpen ? 'open' : ''
                }`}
              >
                ▾
              </span>
            </button>

            {toolsOpen && (
              <div className="navbar-dropdown-menu">
                <Link
                  to="/GamesHome"
                  className="navbar-dropdown-item"
                  onClick={() => setToolsOpen(false)}
                >
                  {t('navbar.games')}
                </Link>
                <Link
                  to="/CalculatorsHome"
                  className="navbar-dropdown-item"
                  onClick={() => setToolsOpen(false)}
                >
                  {t('navbar.calculators')}
                </Link>
              </div>
            )}
          </div>

          <nav className="navbar-links">
            <button
              type="button"
              className="navbar-link"
              onClick={() => scrollToSection('projects-section')}
            >
              {t('navbar.projects')}
            </button>

            <button
              type="button"
              className="navbar-link"
              onClick={() => scrollToSection('contact-section')}
            >
              {t('navbar.contact')}
            </button>
          </nav>

          <button
            type="button"
            className="navbar-lang-btn"
            onClick={() => handleLanguageChange(i18n.language === 'en' ? 'he' : 'en')}
            aria-label={i18n.language === 'en' ? 'Switch to Hebrew' : 'Switch to English'}
          >
            <svg
              className="navbar-lang-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="1.6"
              />
              <path
                d="M2 12h20M12 2a14 14 0 0 1 0 20M12 2a14 14 0 0 0 0 20"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="navbar-lang-text">
              {i18n.language === 'he' ? 'HE' : 'EN'}
            </span>
          </button>


        </div>
      </div>
    </header>
  );
}

export default Navbar;