import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import './styles/HomeSection.css';
import avatar from '../assets/Github-pic.jpg';


const HomeSection = ({
  name = "Muhammad Ali Abid",
  title = ["Front-End Developer", "Data Scientist", "Business Analyst", "AI Enthusiast"],
  description = "Passionate about creating innovative solutions through code and data analysis. I build modern web applications and extract insights from complex datasets.",
  ctaText = "View My Work",
  ctaLink = "#projects",
  // avatarUrl = "./src/assets/Github-pic.jpg"
}) => {
  return (
    <section className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-20 home-section">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center home-section__container">
        {/* Content Side */}
        <div className="space-y-8 text-center lg:text-left home-section__content">
          <div className="space-y-4">
            <h1 className="home-section__heading text-white leading-tight font-semibold">
              <span className="block text-lg md:text-xl lg:text-2xl text-gray-300 mb-1">Salam, I'm</span>
              <span className="text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300 home-section__name">
                {name}
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300 font-medium home-section__title">
              <Typewriter
                words={title}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </h2>
          </div>

          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl home-section__description">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start home-section__cta">
            <a
              href={ctaLink}
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-900 font-semibold rounded-lg hover:from-cyan-400 hover:to-cyan-300 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 home-section__cta-main"
            >
              {ctaText}
              <svg
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-cyan-500 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/10 transition-all duration-300 home-section__cta-secondary"
            >
              Get In Touch
            </a>

          </div>

          {/* Social Links */}
          <div className="flex gap-6 justify-center lg:justify-start pt-4 home-section__socials">
            <a
              href="https://kaggle.com/midnightw4lker"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 home-section__social-link"
              aria-label="Kaggle"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 32 32">
                <path d="M27.6 24.8h-3.2l-6.4-8.4-2.4 2.8v5.6h-3.2V7.2h3.2v8.8l8.4-8.8h3.6l-8.4 8.8 8.4 8.8z"/>
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/muhammad-ali-abid-mw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 home-section__social-link"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://github.com/Midnight-W4lker"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 home-section__social-link"
              aria-label="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Avatar/Image Side */}
        <div className="flex justify-center lg:justify-end home-section__avatar-container">
          <div className="relative home-section__avatar-wrapper">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="w-80 h-80 lg:w-96 lg:h-96 rounded-full object-cover border-4 border-cyan-500/20 shadow-2xl transform hover:scale-105 transition-transform duration-300 home-section__avatar"
              />
            ) : (
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-400/10 border-4 border-cyan-500/20 shadow-2xl flex items-center justify-center home-section__avatar-placeholder">
                <div className="w-32 h-32 bg-gradient-to-br from-cyan-500 to-cyan-400 rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-900">
                    {name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
            )}

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl home-section__avatar-deco1"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-cyan-400/10 rounded-full blur-lg home-section__avatar-deco2"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce home-section__scroll-indicator">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center home-section__scroll-indicator-outer">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse home-section__scroll-indicator-inner"></div>
        </div>
      </div> */}
    </section>
  );
};

export default HomeSection;