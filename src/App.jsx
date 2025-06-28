import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import HomeSection from './components/HomeSection';
import ContactSection from './components/ContactSection';
import SplashCursor from './components/SplashCursor';

import './index.css';

// Only import Router if you plan to use routing
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  // Initialize AOS animations
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: 'ease-in-out', // Easing function
      once: true, // Only animate once
      offset: 100, // Offset from viewport
    });
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Custom cursor */}
      <SplashCursor />

      {/* Main content */}
      <div className="relative z-10">
        <Navbar />
        <HomeSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}

export default App;