import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-scroll';
import GithubLogo from '../assets/Github-Logo.jpeg';
import './styles/Navbar.css'; // Ensure you have the correct path to your CSS
import HomeSection from './HomeSection';
import ProjectSection from './ProjectsSection';
import SkillsSection from './SkillsSection';
import ContactSection from './ContactSection';

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
        className="nav-dropdown fixed left-0 right-0 top-0 mx-auto mt-0 bg-black/80 backdrop-blur-lg rounded-b-2xl shadow-2xl z-50 p-6 flex flex-col items-center"
        style={{
          borderBottom: '2px solid #06b6d4',
          boxShadow: '0 8px 32px 0 rgba(0,255,255,0.12)',
        }}
      >
        <motion.div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <img src={GithubLogo} alt="Logo" className="nav-dropdown-logo" />
          <span className="nav-dropdown-close text-cyan-400 text-2xl mt-2 hover:text-white transition-colors duration-200">✕</span>
        </motion.div>
        <div className="flex flex-row items-center justify-center w-full space-x-6 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth="easeInOutQuart"
              duration={250}
              className="
                px-6 py-2
                rounded-xl
                text-lg font-semibold
                text-white
                bg-cyan-900/30
                hover:bg-cyan-400/20
                hover:text-cyan-300
                focus:bg-cyan-400/30 focus:text-cyan-200
                transition-all duration-200
                outline-none
                shadow-md
                hover:shadow-cyan-400/40
                active:scale-97
                cursor-pointer
                relative
                group
                border-none
              "
              onClick={() => setIsOpen(false)}
            >
              <span className="relative z-10">{link.name}</span>
              {/* Animated underline */}
              <span className="absolute left-4 right-4 bottom-1 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-600 scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100 transition-transform origin-left duration-300 rounded-full opacity-80"></span>
            </Link>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</nav>

<section id="home">
  <HomeSection />
</section>

<section id="projects">
  <ProjectSection />
</section>

<section id="skills">
  <SkillsSection />
</section>

<section id="contact">
  <ContactSection />
</section>
    </>
  );
}
