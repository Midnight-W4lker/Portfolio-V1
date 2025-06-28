import React from 'react';
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 font-sans">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* GitHub icon */}
        <div className="flex justify-center mb-4">
          <a
            href="https://github.com/Midnight-W4lker" // replace with your GitHub URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-white hover:text-teal-400 transition-transform transform hover:scale-125"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-400 tracking-wide">
          &copy; {new Date().getFullYear()} Muhammad Ali Abid. <br></br> All rights reserved.
        </div>
      </div>
    </footer>
  );
}
