
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import heroVid from '../../../assets/Final_hero.mp4';

import intermissionVid from '../../../assets/final intermission.mp4';
import logoImg from '../../../assets/logo.jpg';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const [showComingSoon, setShowComingSoon] = useState(false);
    const { t } = useTranslation();

    const handleVideoEnd = () => {
        setShowComingSoon(true);
    };

    const handleIntermissionEnd = () => {
        setShowComingSoon(false);
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    };

    return (
        <section id="hero" style={{
            position: 'relative',
            height: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            overflow: 'hidden',
        }}>
            {/* Video Background with Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
            }}>
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    onEnded={handleVideoEnd}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                >
                    <source src={heroVid} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7))', // Soft dark gradient
                }}></div>
            </div>

            {/* Coming Soon Intermission Overlay */}
            <AnimatePresence>
                {showComingSoon && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#000', // Black background for video
                            zIndex: 50,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {/* Intermission Video */}
                        <video
                            autoPlay
                            muted
                            playsInline
                            onEnded={handleIntermissionEnd}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                zIndex: 1
                            }}
                        >
                            <source src={intermissionVid} type="video/mp4" />
                        </video>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content (Hidden during intermission) */}
            <motion.div 
                animate={{ opacity: showComingSoon ? 0 : 1 }}
                transition={{ duration: 0.5 }}
                style={{
                    textAlign: 'center',
                    padding: '0 1rem',
                    maxWidth: '1200px',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                >
                    <h1 style={{
                        fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                        fontWeight: '400',
                        marginBottom: '1rem',
                        lineHeight: 1.1,
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        fontFamily: 'var(--font-cursive)',
                        color: 'var(--color-ivory)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '20px',
                        flexWrap: 'wrap'
                    }}>
                        {t('hero.title_prefix')} 
                        <motion.img 
                            src={logoImg} 
                            alt="Logo" 
                            style={{ 
                                width: 'clamp(60px, 10vw, 120px)', 
                                height: 'auto',
                                filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))',
                                borderRadius: '50%' // Make it circular if it's square
                            }}
                            animate={{ 
                                scale: [1, 1.05, 1],
                                filter: [
                                    'drop-shadow(0 0 20px rgba(255, 215, 0, 0.6))',
                                    'drop-shadow(0 0 30px rgba(255, 215, 0, 0.9))',
                                    'drop-shadow(0 0 20px rgba(255, 215, 0, 0.6))'
                                ]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        {t('hero.title_suffix')}
                    </h1>

                    <p style={{
                        fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
                        marginBottom: '3rem',
                        letterSpacing: '2px',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: '300',
                        textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
                        color: '#eee'
                    }}>
                        {t('hero.subtitle')}
                    </p>

                    <motion.button
                        onClick={() => navigate('/login')}
                        whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(212, 175, 55, 0.6)' }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            display: 'inline-block',
                            padding: '1rem 3rem',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            color: '#fff',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            borderRadius: '50px',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            border: '1px solid rgba(255, 255, 255, 0.5)',
                            cursor: 'pointer',
                        }}
                    >
                        {t('hero.cta')}
                    </motion.button>
                </motion.div>
            </motion.div>


        </section >
    );
};

export default Hero;
