import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../config/api.config';
import './WorkshopPopup.responsive.css';

const WorkshopPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [canClose, setCanClose] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    const fetchPopup = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/popup/active`);
        if (data) {
          setPopupData(data);
          // Show popup after specified seconds
          const timer = setTimeout(() => {
            setIsVisible(true);
          }, (data.showAfterSeconds || 5) * 1000);
          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error('Error fetching popup:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopup();
  }, []);

  // Lock body scroll when popup is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';

      // Countdown timer for close button
      const countdown = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setCanClose(true);
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(countdown);
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
      };
    }
  }, [isVisible]);

  const handleClose = () => {
    if (canClose) {
      setIsVisible(false);
    }
  };

  const handleButtonClick = () => {
    if (popupData?.buttonLink) {
      window.open(popupData.buttonLink, '_blank');
    }
  };

  if (loading || !isVisible || !popupData) return null;

  const { title, tag, description, features, price, buttonText, colors, adContent } = popupData;

  return (
    <div
      className="popup-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
        padding: '1rem'
      }}
    >
      <div className="card relative" style={{
        '--primary': colors?.primary || '#ff3e00',
        '--secondary': colors?.secondary || '#4d61ff',
        '--accent': colors?.accent || '#00e0b0'
      }}>
        {/* Close Button with Timer - LARGER SIZE */}
        <button
          onClick={handleClose}
          disabled={!canClose}
          className="absolute top-4 right-4 z-50 w-14 h-14 flex items-center justify-center bg-white border-2 border-black rounded-full hover:bg-red-500 hover:text-white transition-all duration-200 font-bold text-2xl"
          style={{
            boxShadow: '0.3em 0.3em 0 #000',
            cursor: canClose ? 'pointer' : 'not-allowed',
            opacity: canClose ? 1 : 0.6,
            fontSize: canClose ? '2rem' : '1.5rem'
          }}
          title={canClose ? 'Close' : `Wait ${timeLeft}s`}
        >
          {canClose ? '×' : timeLeft}
        </button>

        <div className="card-pattern-grid"></div>
        <div className="card-overlay-dots"></div>

        <div className="bold-pattern">
          <svg viewBox="0 0 100 100">
            <path
              strokeDasharray="15 10"
              strokeWidth="10"
              stroke="#000"
              fill="none"
              d="M0,0 L100,0 L100,100 L0,100 Z"
            ></path>
          </svg>
        </div>

        <div className="card-title-area">
          <span>{title}</span>
          {tag && <span className="card-tag">{tag}</span>}
        </div>

        <div className="card-body">
          <div className="card-description">
            {description}
          </div>

          {/* Ad Content Section */}
          {adContent && (
            <div className="popup-ad-section" style={{
              margin: '1em 0',
              padding: '1em',
              background: 'rgba(255, 215, 0, 0.1)',
              border: '2px solid #FFD700',
              borderRadius: '0.5em',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '0.7em',
                color: '#888',
                marginBottom: '0.5em',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                Advertisement
              </div>
              <div dangerouslySetInnerHTML={{ __html: adContent }} />
            </div>
          )}

          {features && features.length > 0 && (
            <div className="feature-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24">
                      <path d={feature.icon || "M20,4C21.1,4 22,4.9 22,6V18C22,19.1 21.1,20 20,20H4C2.9,20 2,19.1 2,18V6C2,4.9 2.9,4 4,4H20M4,6V18H20V6H4M6,9H18V11H6V9M6,13H16V15H6V13Z"}></path>
                    </svg>
                  </div>
                  <span className="feature-text">{feature.text}</span>
                </div>
              ))}
            </div>
          )}

          <div className="card-actions">
            <div className="price">
              <span className="price-currency">{price?.currency || '$'}</span>{price?.amount || 0}
              <span className="price-period">{price?.period || 'per project'}</span>
            </div>

            <button className="card-button" onClick={handleButtonClick}>
              {buttonText || 'Get Started'}
            </button>
          </div>
        </div>

        <div className="dots-pattern">
          <svg viewBox="0 0 80 40">
            <circle fill="#000" r="3" cy="10" cx="10"></circle>
            <circle fill="#000" r="3" cy="10" cx="30"></circle>
            <circle fill="#000" r="3" cy="10" cx="50"></circle>
            <circle fill="#000" r="3" cy="10" cx="70"></circle>
            <circle fill="#000" r="3" cy="20" cx="20"></circle>
            <circle fill="#000" r="3" cy="20" cx="40"></circle>
            <circle fill="#000" r="3" cy="20" cx="60"></circle>
            <circle fill="#000" r="3" cy="30" cx="10"></circle>
            <circle fill="#000" r="3" cy="30" cx="30"></circle>
            <circle fill="#000" r="3" cy="30" cx="50"></circle>
            <circle fill="#000" r="3" cy="30" cx="70"></circle>
          </svg>
        </div>

        <div className="accent-shape"></div>
        <div className="corner-slice"></div>

        <div className="stamp">
          <span className="stamp-text">Approved</span>
        </div>
      </div>

      <style jsx>{`
        .card {
          --primary: #ff3e00;
          --primary-hover: #ff6d43;
          --secondary: #4d61ff;
          --secondary-hover: #5e70ff;
          --accent: #00e0b0;
          --text: #050505;
          --bg: #ffffff;
          --shadow-color: #000000;
          --pattern-color: #cfcfcf;

          position: relative;
          width: 20em;
          background: var(--bg);
          border: 0.35em solid var(--text);
          border-radius: 0.6em;
          box-shadow:
            0.7em 0.7em 0 var(--shadow-color),
            inset 0 0 0 0.15em rgba(0, 0, 0, 0.05);
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          overflow: hidden;
          font-family: ui-sans-serif, system-ui, sans-serif;
          transform-origin: center;
        }

        .card:hover {
          transform: translate(-0.4em, -0.4em) scale(1.02);
          box-shadow: 1em 1em 0 var(--shadow-color);
        }

        .card:hover .card-pattern-grid,
        .card:hover .card-overlay-dots {
          opacity: 1;
        }

        .card:active {
          transform: translate(0.1em, 0.1em) scale(0.98);
          box-shadow: 0.5em 0.5em 0 var(--shadow-color);
        }

        .card::before {
          content: "";
          position: absolute;
          top: -1em;
          right: -1em;
          width: 4em;
          height: 4em;
          background: var(--accent);
          transform: rotate(45deg);
          z-index: 1;
        }

        .card::after {
          content: "★";
          position: absolute;
          top: 0.4em;
          right: 0.4em;
          color: var(--text);
          font-size: 1.2em;
          font-weight: bold;
          z-index: 2;
        }

        .card-pattern-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(
              to right,
              rgba(0, 0, 0, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
          background-size: 0.5em 0.5em;
          pointer-events: none;
          opacity: 0.5;
          transition: opacity 0.4s ease;
          z-index: 1;
        }

        .card-overlay-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(var(--pattern-color) 1px, transparent 1px);
          background-size: 1em 1em;
          background-position: -0.5em -0.5em;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 1;
        }

        .bold-pattern {
          position: absolute;
          top: 0;
          right: 0;
          width: 6em;
          height: 6em;
          opacity: 0.15;
          pointer-events: none;
          z-index: 1;
        }

        .card-title-area {
          position: relative;
          padding: 1.4em;
          background: var(--primary);
          color: var(--bg);
          font-weight: 800;
          font-size: 1.2em;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 0.35em solid var(--text);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          z-index: 2;
          overflow: hidden;
        }

        .card-title-area::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            45deg,
            rgba(0, 0, 0, 0.1),
            rgba(0, 0, 0, 0.1) 0.5em,
            transparent 0.5em,
            transparent 1em
          );
          pointer-events: none;
          opacity: 0.3;
        }

        .card-tag {
          background: var(--bg);
          color: var(--text);
          font-size: 0.6em;
          font-weight: 800;
          padding: 0.4em 0.8em;
          border: 0.15em solid var(--text);
          border-radius: 0.3em;
          box-shadow: 0.2em 0.2em 0 var(--shadow-color);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transform: rotate(3deg);
          transition: all 0.3s ease;
        }

        .card:hover .card-tag {
          transform: rotate(-2deg) scale(1.1);
          box-shadow: 0.25em 0.25em 0 var(--shadow-color);
        }

        .card-body {
          position: relative;
          padding: 1.5em;
          z-index: 2;
        }

        .card-description {
          margin-bottom: 1.5em;
          color: var(--text);
          font-size: 0.95em;
          line-height: 1.4;
          font-weight: 500;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1em;
          margin-bottom: 1.5em;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.6em;
          transition: transform 0.2s ease;
        }

        .feature-item:hover {
          transform: translateX(0.3em);
        }

        .feature-icon {
          width: 1.4em;
          height: 1.4em;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--secondary);
          border: 0.12em solid var(--text);
          border-radius: 0.3em;
          box-shadow: 0.2em 0.2em 0 rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }

        .feature-item:hover .feature-icon {
          background: var(--secondary-hover);
          transform: rotate(-5deg);
        }

        .feature-icon svg {
          width: 0.9em;
          height: 0.9em;
          fill: var(--bg);
        }

        .feature-text {
          font-size: 0.85em;
          font-weight: 600;
          color: var(--text);
        }

        .card-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1.5em;
          padding-top: 1.2em;
          border-top: 0.15em dashed rgba(0, 0, 0, 0.15);
          position: relative;
        }

        .card-actions::before {
          content: "✂";
          position: absolute;
          top: -0.8em;
          left: 50%;
          transform: translateX(-50%) rotate(90deg);
          background: var(--bg);
          padding: 0 0.5em;
          font-size: 1em;
          color: rgba(0, 0, 0, 0.4);
        }

        .price {
          position: relative;
          font-size: 1.8em;
          font-weight: 800;
          color: var(--text);
          background: var(--bg);
        }

        .price::before {
          content: "";
          position: absolute;
          bottom: 0.15em;
          left: 0;
          width: 100%;
          height: 0.2em;
          background: var(--accent);
          z-index: -1;
          opacity: 0.5;
        }

        .price-currency {
          font-size: 0.6em;
          font-weight: 700;
          vertical-align: top;
          margin-right: 0.1em;
        }

        .price-period {
          display: block;
          font-size: 0.4em;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.6);
          margin-top: 0.2em;
        }

        .card-button {
          position: relative;
          background: var(--secondary);
          color: var(--bg);
          font-size: 0.9em;
          font-weight: 700;
          padding: 0.7em 1.2em;
          border: 0.2em solid var(--text);
          border-radius: 0.4em;
          box-shadow: 0.3em 0.3em 0 var(--shadow-color);
          cursor: pointer;
          transition: all 0.2s ease;
          overflow: hidden;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .card-button::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.2) 50%,
            transparent 100%
          );
          transition: left 0.6s ease;
        }

        .card-button:hover {
          background: var(--secondary-hover);
          transform: translate(-0.1em, -0.1em);
          box-shadow: 0.4em 0.4em 0 var(--shadow-color);
        }

        .card-button:hover::before {
          left: 100%;
        }

        .card-button:active {
          transform: translate(0.1em, 0.1em);
          box-shadow: 0.15em 0.15em 0 var(--shadow-color);
        }

        .dots-pattern {
          position: absolute;
          bottom: 2em;
          left: -2em;
          width: 8em;
          height: 4em;
          opacity: 0.3;
          transform: rotate(-10deg);
          pointer-events: none;
          z-index: 1;
        }

        .accent-shape {
          position: absolute;
          width: 2.5em;
          height: 2.5em;
          background: var(--secondary);
          border: 0.15em solid var(--text);
          border-radius: 0.3em;
          transform: rotate(45deg);
          bottom: -1.2em;
          right: 2em;
          z-index: 0;
          transition: transform 0.3s ease;
        }

        .card:hover .accent-shape {
          transform: rotate(55deg) scale(1.1);
        }

        .stamp {
          position: absolute;
          bottom: 1.5em;
          left: 1.5em;
          width: 4em;
          height: 4em;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 0.15em solid rgba(0, 0, 0, 0.3);
          border-radius: 50%;
          transform: rotate(-15deg);
          opacity: 0.2;
          z-index: 1;
        }

        .stamp-text {
          font-size: 0.6em;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .corner-slice {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 1.5em;
          height: 1.5em;
          background: var(--bg);
          border-right: 0.25em solid var(--text);
          border-top: 0.25em solid var(--text);
          border-radius: 0 0.5em 0 0;
          z-index: 1;
        }
      `}</style>
    </div >
  );
};

export default WorkshopPopup;
