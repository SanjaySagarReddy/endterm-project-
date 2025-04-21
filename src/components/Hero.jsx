import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-background">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
        <div className="gradient-blob blob-3"></div>
      </div>
      
      <div className="icons-container">
        <div className="icons-row">
          <div className="icon blue-icon">W</div>
          <div className="icon black-icon">F</div>
          <div className="icon colored-icon">F</div>
        </div>
        <div className="icon-labels">
          <span>Webflow</span>
          <span>Framer</span>
          <span>Figma</span>
        </div>
      </div>

      <div className="hero-content">
        <h1 className="hero-title">
          The Fastest UI Kit &<br />
          <span className="gradient-text">Design System</span> for<br />
          Your Projects
        </h1>
        
        <p className="hero-description">
          Create beautiful, high-performance websites faster than ever before,
          with seamless workflows for Webflow, Framer, and Figma.
        </p>

        <div className="hero-actions">
          <a href="#" className="primary-button">
            Get Blank
            <span className="button-arrow">→</span>
          </a>
          <a href="#" className="secondary-button">
            <span className="figma-icon">
              <svg width="14" height="20" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M19 28.5C19 24.9 21.9 22 25.5 22C29.1 22 32 24.9 32 28.5C32 32.1 29.1 35 25.5 35C21.9 35 19 32.1 19 28.5Z" fill="#1ABCFE"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M6 41.5C6 37.9 8.9 35 12.5 35H19V41.5C19 45.1 16.1 48 12.5 48C8.9 48 6 45.1 6 41.5Z" fill="#0ACF83"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M19 9V22H25.5C29.1 22 32 19.1 32 15.5C32 11.9 29.1 9 25.5 9H19Z" fill="#FF7262"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M6 15.5C6 19.1 8.9 22 12.5 22H19V9H12.5C8.9 9 6 11.9 6 15.5Z" fill="#F24E1E"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M6 28.5C6 32.1 8.9 35 12.5 35H19V22H12.5C8.9 22 6 24.9 6 28.5Z" fill="#A259FF"/>
              </svg>
            </span>
            Preview in Figma
          </a>
        </div>
      </div>
      
      <div className="hero-stats">
        <div className="stat-item">
          <span className="stat-number">100+</span>
          <span className="stat-label">Components</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">50+</span>
          <span className="stat-label">Templates</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">24/7</span>
          <span className="stat-label">Support</span>
        </div>
      </div>
    </div>
  );
};

export default Hero; 