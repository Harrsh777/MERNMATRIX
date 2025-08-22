
"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaDiscord, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer-container">
      
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          {/* Logo section */}
          <div className="flex-shrink-0">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="footer-logo-container"
              >
                <div className="footer-logo-text">M</div>
              </motion.div>
            </Link>
          </div>

          {/* Navigation columns */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* The Stack */}
            <div className="stack-section">
              <h3 className="footer-heading">MERN STACK</h3>
              <ul className="space-y-3">
                {['Home', 'Tutorials', 'Projects', 'Community', 'Events'].map((item) => (
                  <motion.li key={item} whileHover={{ x: 3 }}>
                    <Link 
                      href={`/${item.toLowerCase()}`} 
                      className="footer-link"
                    >
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* The Legal */}
            <div className="legal-section">
              <h3 className="footer-heading">THE LEGAL</h3>
              <ul className="space-y-3">
                {['Terms of Service', 'Privacy Policy', 'Code of Conduct'].map((item) => (
                  <motion.li key={item} whileHover={{ x: 3 }}>
                    <Link 
                      href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                      className="footer-link"
                    >
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* The Network */}
            <div className="network-section">
              <h3 className="footer-heading">THE NETWORK</h3>
              <ul className="space-y-3">
                <motion.li whileHover={{ x: 3 }}>
                  <a href="#" className="footer-link flex items-center">
                    <FaGithub className="mr-2" /> GitHub
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 3 }}>
                  <a href="#" className="footer-link flex items-center">
                    <FaDiscord className="mr-2" /> Discord
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 3 }}>
                  <a href="#" className="footer-link flex items-center">
                    <FaLinkedin className="mr-2" /> LinkedIn
                  </a>
                </motion.li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <motion.div 
        initial={{ opacity: 0.96 }}
        whileHover={{ opacity: 1 }}
        className="font-sans uppercase footer-matrix"
        style={{
          fontFamily: "'Inter Black', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(4rem, 12vw, 10rem)', // Larger font size
          lineHeight: 0.8, // Tighter line height for taller letters
          letterSpacing: '0.01em', // Slightly more spacing
          color: '#ffffff',
          width: '230vw', // More horizontal space
          marginLeft: '0', // Balanced overflow
          marginBottom: '-4rem', // More vertical overflow
          paddingTop: '2rem', // Additional top space
          paddingBottom: '2rem', // Additional bottom space
          whiteSpace: 'nowrap',
          height: '1em' // Explicit height control
        }}
      >
        mern matrix
      </motion.div>
  
      </div>

      <style jsx>{`
        .footer-container {
          background-color: #121212;
          color: white;
          padding: 4rem 1.5rem; /* Adjusted for better visual */
          font-family: sans-serif;
          position: relative;
        }

        .max-w-7xl {
          max-width: 80rem; /* Adjust as needed */
          margin-left: auto;
          margin-right: auto;
        }

        .flex {
          display: flex;
        }

        .flex-col {
          flex-direction: column;
        }

        .md\:flex-row {
          flex-direction: row;
        }

        .justify-between {
          justify-content: space-between;
        }

        .gap-12 {
          gap: 3rem; /* Converted rem to px as a base */
        }

        .mb-16 {
          margin-bottom: 4rem;
        }

        .flex-shrink-0 {
          flex-shrink: 0;
        }

        .grid {
          display: grid;
        }

        .grid-cols-1 {
          grid-template-columns: repeat(1, minmax(0, 1fr));
        }

        .sm\:grid-cols-3 {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .gap-8 {
          gap: 2rem;
        }

        .space-y-3 > * + * {
          margin-top: 0.75rem;
        }

        .footer-heading {
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 1.5rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .footer-link {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: color 0.2s ease-in-out;
          font-size: 0.875rem;
        }

        .footer-link:hover {
          color: #fff;
        }

        .border-t {
          border-top-width: 1px;
        }

        .border-white\/10 {
          border-color: rgba(255, 255, 255, 0.1);
        }

        .mb-8 {
          margin-bottom: 2rem;
        }

        .footer-brand-mark {
          font-family: 'Your chosen font', sans-serif; /* Replace with the exact font from the image */
          font-size: 4rem;
          font-weight: 900;
          letter-spacing: -0.05em;
          text-transform: uppercase;
          line-height: 1.1;
          text-align: left;
          margin-bottom: 0;
        }

        .footer-logo-container {
          width: 4rem;
          height: 4rem;
          background-color: white;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .footer-logo-container:hover {
          scale: 1.05;
        }

        .footer-logo-text {
          color: black;
          font-weight: bold;
          font-size: 1.5rem;
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .footer-brand-mark {
            font-size: 3rem; /* Adjust as needed */
            text-align: center;
          }
        }

        @media (max-width: 576px) {
          /* Hide entire Network section on small phones to keep 8 links total */
          .network-section { display: none; }
          /* Limit Stack to first 4 items on phones */
          .stack-section ul li:nth-child(n+5) { display: none; }
          /* Legal has 3 items already; if more are added later, cap at 4 */
          .legal-section ul li:nth-child(n+5) { display: none; }
          /* Ensure two equal columns on very small screens */
          .footer-brand-mark {
            font-size: 2.5rem; /* Adjust as needed */
          }
          .gap-12 {
            gap: 2rem; /* Adjust gap size here to avoid overflow */
          }
          /* Stick MERN MATRIX to bottom with slight overlap */
          .footer-matrix { position: sticky; bottom: -5px; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;