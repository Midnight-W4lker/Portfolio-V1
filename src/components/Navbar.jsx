import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-scroll';
import GithubLogo from '../assets/Github-Logo.jpeg';
import GooeyNav from './GooeyNav';
import './styles/Navbar.css'; // Ensure you have the correct path to your CSS

export default function Navbar() {
  const [isClosed, setIsClosed] = useState(true);
  // State to control mobile dropdown visibility
  const [isOpen, setIsOpen] = useState(false);
  const [localScrollY, setLocalScrollY] = useState(0);

  // Framer Motion scroll progress
  const { scrollY } = useScroll();

  // Track scrollY locally for logic outside motion
  useEffect(() => {
    const updateScroll = () => setLocalScrollY(window.scrollY);
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'Projects', to: 'projects' },
    { name: 'Skills', to: 'skills' },
    { name: 'Contact', to: 'contact' },
  ];

  // These are now motion values
  const logoScale = useTransform(scrollY, [0, 300], [1, 1.5]);
  const logoOpacity = useTransform(scrollY, [0, 300], [1, 0.6]);

  const hideNav = localScrollY > 80;
  const showGooey = localScrollY > 10;

  return (
    <>
      <nav className={`navbar ${localScrollY > 30 ? 'navbar-scrolled' : 'navbar-transparent'}`}>
  <div className="navbar-container">
    <motion.img
      src={GithubLogo}
      alt="Logo"
      className={`navbar-logo ${localScrollY > 40 ? 'navbar-logo-center' : ''}`}
      style={{ scale: logoScale, opacity: logoOpacity }}
      onClick={() => {
        if (hideNav) setIsOpen((prev) => !prev);
      }}
    />

    {!hideNav && (
      <div className="nav-links hidden md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            smooth="easeInOutQuart"
            duration={250}
            className="nav-link"
          >
            {link.name}
          </Link>
        ))}
      </div>
    )}

    {!isOpen && !hideNav && (
      <button
        className="hamburger-btn md:hidden"
        onClick={() => setIsOpen(true)}
      >
        ☰
      </button>
    )}
  </div>

  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ height: 0, opacity: 0, y: -40 }}
        animate={{ height: 'auto', opacity: 1, y: 0 }}
        exit={{ height: 0, opacity: 0, y: -40 }}
        className="nav-dropdown"
      >
        <motion.div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <img src={GithubLogo} alt="Logo" className="nav-dropdown-logo" />
          <span className="nav-dropdown-close">✕</span>
        </motion.div>
        <div className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0 w-full items-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth="easeInOutQuart"
              duration={250}
              className="nav-dropdown-link"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</nav>


    </>
  );
}
