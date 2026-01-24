import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlay, faAppStore } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';
import aboutAppImg from '../../../assets/about-app-mobile.png';

const AppDownload = () => {
    const { t } = useTranslation();

    return (
        <section style={{
            padding: '6rem 2rem',
            background: 'var(--color-ivory)',
            overflow: 'hidden'
        }}>
            <div style={{ 
                maxWidth: '1200px', 
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '4rem'
            }}>
                {/* Left Side - Sliding Image */}
                <motion.div
                    initial={{ x: -150, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ 
                        type: "spring", 
                        stiffness: 70, 
                        damping: 20,
                        duration: 1.2 
                    }}
                    viewport={{ once: false, amount: 0.3 }}
                    style={{
                        flex: '1 1 400px',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <div style={{
                        position: 'relative',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        transform: 'perspective(1000px) rotateY(5deg)'
                    }}>
                        <img 
                            src={aboutAppImg} 
                            alt="Shubh Vivah App" 
                            style={{
                                width: '100%',
                                maxWidth: '350px',
                                height: 'auto',
                                display: 'block',
                                borderRadius: '20px',
                            }} 
                        />
                    </div>
                </motion.div>

                {/* Right Side - Content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    viewport={{ once: false }}
                    style={{
                        flex: '1 1 400px',
                        textAlign: 'left'
                    }}
                >
                    <h2 style={{
                        fontSize: '3.5rem',
                        color: 'var(--color-maroon)',
                        fontFamily: 'var(--font-cursive)',
                        marginBottom: '1.5rem',
                        lineHeight: '1.2'
                    }}>
                        {t('app_download.title_prefix')} <br/>
                        <span style={{ 
                            color: 'var(--color-gold)',
                            fontFamily: 'var(--font-heading)',
                            fontSize: '2.5rem',
                            textTransform: 'uppercase',
                            letterSpacing: '2px'
                        }}>{t('app_download.title_suffix')}</span>
                    </h2>
                    
                    <p style={{
                        fontSize: '1.2rem',
                        color: '#555',
                        marginBottom: '3rem',
                        lineHeight: '1.6',
                        fontFamily: 'var(--font-body)'
                    }}>
                        {t('app_download.description')}
                    </p>

                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        {/* Play Store Button */}
                        <motion.button
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '12px 25px',
                                background: 'var(--color-maroon)',
                                color: 'var(--color-gold)',
                                border: 'none',
                                borderRadius: '10px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                boxShadow: '0 5px 15px rgba(128, 0, 0, 0.2)',
                                fontFamily: 'var(--font-heading)'
                            }}
                        >
                            <FontAwesomeIcon icon={faGooglePlay} size="2x" />
                            <div style={{ textAlign: 'left' }}>
                                <span style={{ display: 'block', fontSize: '0.7rem', opacity: 0.8, fontFamily: 'var(--font-body)' }}>{t('app_download.coming_soon')}</span>
                                <span>{t('app_download.google_play')}</span>
                            </div>
                        </motion.button>

                        {/* App Store Button */}
                        <motion.button
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '12px 25px',
                                background: 'var(--color-maroon)',
                                color: 'var(--color-gold)',
                                border: 'none',
                                borderRadius: '10px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                boxShadow: '0 5px 15px rgba(128, 0, 0, 0.2)',
                                fontFamily: 'var(--font-heading)'
                            }}
                        >
                            <FontAwesomeIcon icon={faAppStore} size="2x" />
                            <div style={{ textAlign: 'left' }}>
                                <span style={{ display: 'block', fontSize: '0.7rem', opacity: 0.8, fontFamily: 'var(--font-body)' }}>{t('app_download.coming_soon')}</span>
                                <span>{t('app_download.app_store')}</span>
                            </div>
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AppDownload;
