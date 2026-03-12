

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './navbar.css';
import logo from '../../assets/Asset 2@4x.png';
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
    { title: 'Home', href: '/' },
    { title: 'Products', href: '/products' },
    { title: 'Contact Us', href: '/contact' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
      {/* Announcement Bar */}
      <div className="announcement-bar">
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
              {link.title}
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <button className="close-menu" onClick={toggleMenu}>
              &times;
            </button>
            {navLinks.map((link) => (
              <motion.a
                key={link.title}
                href={link.href}
                className="mobile-nav-link"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onClick={toggleMenu}
              >
                {link.title}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

