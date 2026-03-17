

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './navbar.css';
import logo from '../../assets/Asset 2@4x.png';
import logo2 from '../../assets/Asset 10@4x.png';
import flag from '../../assets/Asset 3@4x.png';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    {
      title: 'Home',
      href: '/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    },
    {
      title: 'Products',
      href: '/products',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      )
    },
    {
      title: 'Contact Us',
      href: '/contact',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      )
    },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
      {/* Announcement Bar */}
      <div className="announcement-bar pt-4 pb-3">
        
        PREMIUM SUPPLEMENTS ENGINEERED FOR EXCELLENCE
      </div>

      {/* Main Navigation */}
      <div className="main-nav">
        {/* Left Side: Logo */}
        <div className="nav-left">
          <img src={logo} alt="Wegon Nutrition Logo" className="logo" />
        </div>

        {/* Center: Desktop Nav Links */}
        <div className="nav-center">
          {navLinks.map((link) => (
            <Link key={link.title} to={link.href} className="nav-link">
              <span className="link-icon">{link.icon}</span>
              <span className="link-text">{link.title}</span>
            </Link>
          ))}
        </div>

        {/* Right Side: Flag and Toggle */}
        <div className="nav-right">
          <img src={flag} alt="UK Flag" className="flag-icon" />

          <button
            className={`burger-menu ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />
            
            <motion.div
              className="mobile-menu-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="drawer-header">
                <img src={logo2} alt="Logo" className="drawer-logo" />
                <button className="drawer-close" onClick={toggleMenu}>&times;</button>
              </div>

              <div className="drawer-links">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link
                      to={link.href}
                      className="mobile-nav-link"
                      onClick={toggleMenu}
                    >
                      <span className="mobile-link-icon">{link.icon}</span>
                      <span className="mobile-link-text">{link.title}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="drawer-footer">
                <img src={flag} alt="UK" className="drawer-flag" />
                <p>Wegon Nutrition UK</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

