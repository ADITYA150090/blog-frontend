import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, User, Briefcase, FileText, Mail, Star, TrendingUp, Search, Bookmark, LogIn, LogOut, Menu, X, Users, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import './Sidebar.css';

const Sidebar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);

    // For home page sections
    if (window.location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home first, then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <button
        className="mobile-menu-toggle"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* <img src="/logo.svg" alt="CodeBlog Logo" style={{ width: '32px', height: '32px' }} /> */}
            <span>Coffee & Code</span>
          </Link>
          {isAuthenticated && user && (
            <Link
              to={`/profile/${user.username}`}
              className="sidebar-profile"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <img
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random&size=32`}
                alt={user.name}
                className="sidebar-avatar"
              />
              <div className="sidebar-user-info">
                <div className="sidebar-user-name">{user.name}</div>
                <div className="sidebar-user-username">@{user.username}</div>
              </div>
            </Link>
          )}
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="nav-section-title">Navigation</div>

            <div
              className={`nav-item ${activeSection === 'home' ? 'active' : ''}`}
              onClick={() => scrollToSection('home')}
            >
              <Home className="nav-icon" size={18} />
              <span>Home</span>
            </div>

            <div
              className={`nav-item ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => scrollToSection('about')}
            >
              <User className="nav-icon" size={18} />
              <span>About</span>
            </div>

            {/* <div
              className={`nav-item ${activeSection === 'portfolio' ? 'active' : ''}`}
              onClick={() => scrollToSection('portfolio')}
            >
              <Briefcase className="nav-icon" size={18} />
              <span>Portfolio</span>
            </div> */}

            <Link
              to="/blogs"
              className="nav-item"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FileText className="nav-icon" size={18} />
              <span>All Blogs</span>
            </Link>

            <Link
              to="/projects"
              className="nav-item"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Briefcase className="nav-icon" size={18} />
              <span>All Projects</span>
            </Link>
          </div>

          {isAuthenticated && (
            <div className="nav-section">
              <div className="nav-section-title">Personal</div>

              <Link
                to={`/profile/${user.username}`}
                className="nav-item"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="nav-icon" size={18} />
                <span>My Profile</span>
              </Link>

              <Link
                to={`/profile/${user.username}#bookmarks`}
                className="nav-item"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Bookmark className="nav-icon" size={18} />
                <span>Bookmarks</span>
              </Link>

              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  className="nav-item"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Shield className="nav-icon" size={18} />
                  <span>Admin Panel</span>
                </Link>
              )}
            </div>
          )}

          <div className="nav-section">
            <div className="nav-section-title">Discover</div>

            {/* <div className="nav-item">
              <Star className="nav-icon" size={18} />
              <span>Featured</span>
            </div>

            <div className="nav-item">
              <TrendingUp className="nav-icon" size={18} />
              <span>Trending</span>
            </div> */}

            <Link
              to="/search"
              className="nav-item"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Users className="nav-icon" size={18} />
              <span>Find Users</span>
            </Link>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Account</div>

            {!isAuthenticated ? (
              <div
                className="nav-item"
                onClick={() => {
                  setShowAuthModal(true);
                  setIsMobileMenuOpen(false);
                }}
              >
                <LogIn className="nav-icon" size={18} />
                <span>Login / Register</span>
              </div>
            ) : (
              <div
                className="nav-item"
                onClick={handleLogout}
              >
                <LogOut className="nav-icon" size={18} />
                <span>Logout</span>
              </div>
            )}
          </div>
        </nav>
      </aside>

      {isMobileMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default Sidebar;
