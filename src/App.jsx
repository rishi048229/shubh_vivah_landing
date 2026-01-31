import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage/LandingPage';
import AvailableSoon from './pages/AvailableSoon';

import Footer from './components/Footer';
import ScrollToHash from './components/ScrollToHash';
import AIPanditBot from './components/AIPanditBot';
import ReviewSystem from './components/ReviewSystem';

const ReviewButton = () => (
    <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
            position: 'fixed',
            bottom: '90px', // Above footer/bot
            left: '20px', // Bottom Left
            right: 'auto',
            zIndex: 99,
            background: 'var(--color-gold)',
            color: 'var(--color-maroon)',
            border: 'none',
            borderRadius: '50px',
            padding: '10px 20px',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        }}
    >
        <MessageSquare size={18} /> Review Us
    </motion.button>
);

function App() {
  const location = useLocation();
  const { i18n } = useTranslation();
  
  useEffect(() => {
    if (i18n.language === 'hi' || i18n.language === 'mr') {
      document.body.classList.add('vernacular-font');
    } else {
      document.body.classList.remove('vernacular-font');
    }
  }, [i18n.language]);
  // const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  const isAuthPage = false; // No auth pages anymore

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="app-container">
      <ScrollToHash />
      
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<AvailableSoon />} />
        </Routes>
      </main>

      <AIPanditBot />
      <Footer />
      <ReviewSystem />
    </div>
  );
}

export default App;