import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Horoscope.css';
import zodiacSprite from '../../../assets/zodiac_sprite.png';

const RASHIS = [
    { id: 1, name: "Aries", pos: "0% 0%", color: "#FF5733" },
    { id: 2, name: "Taurus", pos: "33.33% 0%", color: "#4CAF50" },
    { id: 3, name: "Gemini", pos: "66.66% 0%", color: "#FFC107" },
    { id: 4, name: "Cancer", pos: "100% 0%", color: "#2196F3" },
    { id: 5, name: "Leo", pos: "0% 50%", color: "#FF9800" },
    { id: 6, name: "Virgo", pos: "33.33% 50%", color: "#9C27B0" },
    { id: 7, name: "Libra", pos: "66.66% 50%", color: "#E91E63" },
    { id: 8, name: "Scorpio", pos: "100% 50%", color: "#795548" },
    { id: 9, name: "Sagittarius", pos: "0% 100%", color: "#673AB7" },
    { id: 10, name: "Capricorn", pos: "33.33% 100%", color: "#607D8B" },
    { id: 11, name: "Aquarius", pos: "66.66% 100%", color: "#00BCD4" },
    { id: 12, name: "Pisces", pos: "100% 100%", color: "#009688" },
];

export default function Horoscope() {
    const [selectedRashi, setSelectedRashi] = useState(null);
    const { t } = useTranslation();

    return (
        <section className="horoscope-section" id="horoscope">
            <div className="horoscope-container">
                <div className="section-header">
                    <h2>{t('horoscope.title')}</h2>
                    <p>{t('horoscope.subtitle')}</p>
                </div>

                {/* RASHI CAROUSEL */}
                <div className="rashi-carousel-wrapper">
                    <div className="rashi-track">
                        {[...RASHIS, ...RASHIS].map((rashi, index) => (
                            <motion.div
                                key={`${rashi.id}-${index}`}
                                className="rashi-card"
                                whileHover={{ scale: 1.1, y: -10 }}
                                onClick={() => setSelectedRashi(rashi)}
                            >
                                <div 
                                    className="rashi-icon-3d" 
                                    style={{ 
                                        backgroundImage: `url(${zodiacSprite})`,
                                        backgroundPosition: rashi.pos,
                                        backgroundSize: '400% 300%', // 4 cols, 3 rows
                                        width: '80%',
                                        height: '80%',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                />
                                <span className="rashi-name">{rashi.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="horoscope-cta">
                    <button className="btn-find-rashi" onClick={() => setSelectedRashi(RASHIS[0])}>
                        {t('horoscope.cta')} <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {/* MODAL */}
            <AnimatePresence>
                {selectedRashi && (
                    <motion.div 
                        className="horoscope-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedRashi(null)}
                    >
                        <motion.div 
                            className="horoscope-modal"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="close-modal" onClick={() => setSelectedRashi(null)}>
                                <X size={24} />
                            </button>
                            
                            <div className="modal-header">
                                <div className="modal-icon">
                                    <div 
                                        style={{ 
                                            backgroundImage: `url(${zodiacSprite})`,
                                            backgroundPosition: selectedRashi.pos,
                                            backgroundSize: '400% 300%',
                                            width: '100px',
                                            height: '100px',
                                            backgroundRepeat: 'no-repeat',
                                            margin: '0 auto'
                                        }}
                                    />
                                </div>
                                <h3>{selectedRashi.name}</h3>
                            </div>

                            <div className="modal-content">
                                <div className="horoscope-tabs">
                                    <button className="active">{t('horoscope.modal.daily')}</button>
                                    <button>{t('horoscope.modal.weekly')}</button>
                                    <button>{t('horoscope.modal.yearly')}</button>
                                </div>
                                <p className="horoscope-text">
                                    {t('horoscope.modal.prediction')}
                                </p>
                                <div className="lucky-stats">
                                    <div className="stat">
                                        <span>{t('horoscope.modal.lucky_color')}</span>
                                        <strong style={{ color: selectedRashi.color }}>Red</strong>
                                    </div>
                                    <div className="stat">
                                        <span>{t('horoscope.modal.lucky_number')}</span>
                                        <strong>7</strong>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
