import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../HomePage/HomePage.css';
import { useTranslation } from 'react-i18next';

function Homepage() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="homepage-hero">
        <div className="homepage-hero-right">
          <div className="homepage-profile-glow">
            <div className="homepage-profile-image-wrapper">
              <img
                src="/profile.png"
                alt="Yehuda Shmulevitz"
                className="homepage-profile-image"
              />
            </div>
          </div>
        </div>

        <div className="homepage-hero-left">
          <span className="homepage-tag">{t('homepage.tag')}</span>

          <h1 className="homepage-name">{t('homepage.name')}</h1>

          <p className="homepage-role">
            {t('homepage.role')}
          </p>

          <p className="homepage-summary">
            {t('homepage.summary')}
          </p>

          <div className="homepage-actions">
            <a
              href="https://drive.google.com/file/d/1Wm3_TDWkRHEG5sb1uDZxwyLAVF_uRx2j/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="homepage-btn homepage-btn-primary"
            >
              {t('homepage.cvButton')}
            </a>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("contact-section");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="homepage-btn homepage-btn-secondary"
            >
              {t('homepage.contactButton')}
            </button>

            <a
              href="https://www.linkedin.com/in/yehuda-shmulevitz/"
              target="_blank"
              rel="noopener noreferrer"
              className="homepage-btn homepage-btn-ghost"
            >
              {t('homepage.linkedinButton')}
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="homepage-sections">
        
        {/* Featured Projects */}
        <div className="homepage-card" id="projects-section">
          <h2 className="homepage-card-title">{t('homepage.projectsTitle')}</h2>
          <p className="homepage-card-subtitle">
            {t('homepage.projectsSubtitle')}
          </p>

          <div className="homepage-project">
            <h3>{t('homepage.projectMesayaTitle')}</h3>
            <p>{t('homepage.projectMesayaDesc')}</p>
            <p className="homepage-project-tech">
              {t('homepage.projectMesayaTech')}
            </p>
            <div className="homepage-project-links">
              <a
                href="https://docs.google.com/presentation/d/e/2PACX-1vSyZ1gSFUWk0Pk3quRsl8t14joQz48WpaQ_MRjPLk0N-8JKU_w2JB8U4W1EXjUYLw/pub?start=true&loop=false&delayms=3000"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('homepage.projectMesayaLink')}
              </a>
            </div>
          </div>

          <div className="homepage-project">
            <h3>{t('homepage.projectHeartTitle')}</h3>
            <p>{t('homepage.projectHeartDesc')}</p>
            <p className="homepage-project-tech">
              {t('homepage.projectHeartTech')}
            </p>
            <div className="homepage-project-links">
              <a
                href="https://github.com/yehuda121/heart_attack_prediction"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('homepage.projectHeartLink')}
              </a>
            </div>
          </div>

          <div className="homepage-project">
            <h3>{t('homepage.projectWarehouseTitle')}</h3>
            <p>{t('homepage.projectWarehouseDesc')}</p>
            <p className="homepage-project-tech">
              {t('homepage.projectWarehouseTech')}
            </p>
            <div className="homepage-project-links">
              <a
                href="https://quickshop-9702e.web.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('homepage.projectWarehouseLink')}
              </a>
            </div>
          </div>

          {showAllProjects && (
            <>
              <div className="homepage-project">
                <h3>{t('homepage.projectWizardTitle')}</h3>
                <p>{t('homepage.projectWizardDesc')}</p>
                <p className="homepage-project-tech">
                  {t('homepage.projectWizardTech')}
                </p>
                <div className="homepage-project-links">
                  <a
                    href="https://youtu.be/msOr3By3SdQ"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('homepage.projectWizardLink')}
                  </a>
                </div>
              </div>

              <div className="homepage-project">
                <h3>{t('homepage.projectDiskTitle')}</h3>
                <p>{t('homepage.projectDiskDesc')}</p>
                <p className="homepage-project-tech">
                  {t('homepage.projectDiskTech')}
                </p>
                <div className="homepage-project-links">
                  <a
                    href="https://github.com/yehuda121/disk_simulator"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('homepage.projectDiskLink')}
                  </a>
                </div>
              </div>

              <div className="homepage-project">
                <h3>{t('homepage.projectExtTitle')}</h3>
                <p>{t('homepage.projectExtDesc')}</p>
                <p className="homepage-project-tech">
                  {t('homepage.projectExtTech')}
                </p>
                <div className="homepage-project-links">
                  <a
                    href="https://github.com/yehuda121/google-search-results-hider-extension"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('homepage.projectExtLink')}
                  </a>
                </div>
              </div>
            </>
          )}

          {/* open / close button */}
          <div className="homepage-project-toggle-wrapper">
            <button
              type="button"
              className="homepage-project-toggle"
              onClick={() => setShowAllProjects((prev) => !prev)}
            >
              {showAllProjects
                ? t('homepage.projectsShowLess')
                : t('homepage.projectsShowMore')}
            </button>
          </div>
        </div>

        {/* Tools & Mini Apps */}
        <div className="homepage-card">
          <h2 className="homepage-card-title">{t('homepage.toolsTitle')}</h2>
          <p className="homepage-card-text">
            {t('homepage.toolsText')}
          </p>

          <div className="homepage-tools-buttons">
            <Link
              to="/GamesHome"
              className="homepage-tools-btn homepage-tools-btn-primary"
            >
              {t('homepage.toolsGames')}
            </Link>
            <Link
              to="/CalculatorsHome"
              className="homepage-tools-btn homepage-tools-btn-secondary"
            >
              {t('homepage.toolsCalculators')}
            </Link>
          </div>

          <p className="homepage-card-note">
            {t('homepage.toolsNote')}
          </p>
        </div>

        {/* Contact */}
        <div className="homepage-card" id="contact-section">
          <h2 className="homepage-card-title">{t('homepage.contactTitle')}</h2>
          <p className="homepage-card-text">
            {t('homepage.contactText')}
          </p>

          <ul className="homepage-contact-list">
            <li>
              <strong>{t('homepage.contactEmailLabel')}</strong>{' '}
              <a href="mailto:yehudash1994@gmail.com">
                yehudash1994@gmail.com
              </a>
            </li>
            <li>
              <strong>{t('homepage.contactPhoneLabel')}</strong>{' '}
              <a href="tel:0502942211">050-2942211</a>
            </li>
            <li>
              <strong>{t('homepage.contactLinkedinLabel')}</strong>{' '}
              <a
                href="https://www.linkedin.com/in/yehuda-shmulevitz/"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/yehuda-shmulevitz
              </a>
            </li>
            <li>
              <strong>{t('homepage.contactGithubLabel')}</strong>{' '}
              <a
                href="https://github.com/yehuda121?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/yehuda121
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Social Icons (bottom) */}
      <div className="social-media-container">
        <a
          href="https://www.linkedin.com/in/yehuda-shmulevitz/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-media-link"
        >
          <img src="/linkdinLogo.png" alt="LinkedIn" />
        </a>
        <a
          href="https://github.com/yehuda121?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="social-media-link"
        >
          <img src="/githubLogo.png" alt="GitHub" />
        </a>
        <a
          href="https://www.facebook.com/yehuda.shmulevitz.1"
          className="social-media-link"
        >
          <img src="/facebookLogo.png" alt="Email / Social" />
        </a>
      </div>
    </div>
  );
}

export default Homepage;
