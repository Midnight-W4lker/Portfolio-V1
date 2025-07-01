import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import HomeSection from './components/HomeSection';
import ContactSection from './components/ContactSection';
import SplashCursor from './components/SplashCursor/SplashCursor';
import './index.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
// Only import Router if you plan to use routing
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
      <SplashCursor />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-900 to-cyan-800 via-cyan-700 z-0"></div>
      <div className="relative z-10">
        <Navbar />
        <section id="home">
          <HomeSection />
        </section>
        <section id="projects">
          <ProjectsSection />
        </section>
        <section id="skills">
          <SkillsSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
        <Footer />
      </div>
    </div>
  );
}

export default App;