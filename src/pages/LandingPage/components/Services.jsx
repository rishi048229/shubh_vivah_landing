import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useTime, useSpring } from 'framer-motion';
import { Camera, Utensils, Calendar, Sparkles, ShieldCheck, Users, Lock, ScrollText, Mail, Music, Plane, ClipboardCheck, Gem } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Services.css';

export default function Services() {
    const { t } = useTranslation();
    const [activeCategory, setActiveCategory] = useState('photography'); // Use key instead of name
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef(null);

    // Service Data for Highlight Card
    const serviceDetails = {
        'photography': { vendors: 150, price: '₹xxxx', label: t('services.labels.photography') },
        'fashion': { vendors: 80, price: 'On Request', label: t('services.labels.fashion') },
        'catering': { vendors: 200, price: '₹xxx/plate', label: t('services.labels.catering') },
        'music': { vendors: 90, price: '₹xxxx', label: t('services.labels.music') },
        'horoscope': { vendors: 'AI', price: 'FREE', label: t('services.labels.horoscope') },
        'venue': { vendors: 300, price: '₹xxxx', label: t('services.labels.venue') },
        'honeymoon': { vendors: 40, price: '₹xxxx', label: t('services.labels.honeymoon') },
        'invites': { vendors: 50, price: '₹xxxx', label: t('services.labels.invites') },
        'management': { vendors: 70, price: '₹xxxx', label: t('services.labels.management') },
    };

    const currentService = serviceDetails[activeCategory] || serviceDetails['photography'];

    // 1. Scroll Progress
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Smooth out the scroll progress to prevent lag/jerkiness
    const smoothScroll = useSpring(scrollYProgress, { stiffness: 50, damping: 20, mass: 0.5 });

    // 2. Time for ambient rotation
    const time = useTime();
    
    // Ambient Rotation: Continuous slow rotation
    const ambientRotation = useTransform(time, (t) => t / 100);

    // Scroll Rotation: Map smooth scroll progress to degrees
    const scrollRotation = useTransform(smoothScroll, [0, 1], [-100, 100]);
    
    // Combine rotations
    const totalRotation = useTransform(
        [ambientRotation, scrollRotation],
        ([ambient, scroll]) => ambient + scroll
    );

    // Negative rotation for icons to keep them upright
    const negativeRotation = useTransform(totalRotation, value => -value);

    const categories = [
        { id: 'photography', name: t('services.categories.photography'), icon: <Camera size={24} /> },
        { id: 'fashion', name: t('services.categories.fashion'), icon: <Gem size={24} /> },
        { id: 'catering', name: t('services.categories.catering'), icon: <Utensils size={24} /> },
        { id: 'music', name: t('services.categories.music'), icon: <Music size={24} /> },
        { id: 'horoscope', name: t('services.categories.horoscope'), icon: <ScrollText size={24} /> },
        { id: 'venue', name: t('services.categories.venue'), icon: <Calendar size={24} /> },
        { id: 'honeymoon', name: t('services.categories.honeymoon'), icon: <Plane size={24} /> },
        { id: 'invites', name: t('services.categories.invites'), icon: <Mail size={24} /> },
        { id: 'management', name: t('services.categories.management'), icon: <ClipboardCheck size={24} /> },
    ];

    return (
        <div className="services-container" ref={containerRef} id="services">
            
            {/* BACKGROUND GLOW */}
            <div className="radial-glow"></div>

            {/* LEFT SIDE: CONTEXT & STORY */}
            <div className="services-left">
                <motion.div 
                    className="intro-block"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h3>{t('services.title')}</h3>
                    <p>
                        {t('services.description')}
                    </p>
                    
                    {/* Cultural SVG Background (Subtle) */}
                    <div className="cultural-bg">
                        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 0C100 0 120 50 150 50C180 50 200 100 200 100C200 100 150 120 150 150C150 180 100 200 100 200C100 200 80 150 50 150C20 150 0 100 0 100C0 100 50 80 50 50C50 20 100 0 100 0Z" fill="#800000" />
                        </svg>
                    </div>
                </motion.div>
            </div>

            {/* CENTER: RANGOLI (Untouched Logic, just wrapped in grid cell) */}
            <div className="rangoli-grid-cell" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                
                {/* CENTER TEXT (Static) */}
                <div className="center-text">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <span>Shubh</span>
                        <h2>Vivah</h2>
                        <p style={{ letterSpacing: '3px', fontSize: '0.8rem', marginTop: '10px', color: '#800000' }}>{t('services.center_text')}</p>
                    </motion.div>
                </div>

                {/* ROTATING RANGOLI WRAPPER */}
                <motion.div 
                    className="rangoli-wrapper"
                    style={{ rotate: totalRotation }}
                >
                    {/* SVG RANGOLI BACKGROUND */}
                    <svg className="rangoli-svg" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Outer Glow Ring */}
                        <circle cx="300" cy="300" r="280" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.3" />
                        <circle cx="300" cy="300" r="260" stroke="#D4AF37" strokeWidth="1" strokeDasharray="10 10" />
                        
                        {/* Petals Pattern */}
                        {[...Array(12)].map((_, i) => (
                            <path
                                key={i}
                                d="M300 300 Q 320 200 300 120 Q 280 200 300 300"
                                fill="#FF9933"
                                fillOpacity="0.1"
                                stroke="#800000"
                                strokeWidth="1"
                                transform={`rotate(${i * 30} 300 300)`}
                            />
                        ))}
                        
                        {/* Inner Circles (Breathing) */}
                        <motion.circle 
                            cx="300" cy="300" r="140" 
                            fill="#FFF8E1" 
                            stroke="#D4AF37" 
                            strokeWidth="2"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.circle 
                            cx="300" cy="300" r="120" 
                            stroke="#800000" 
                            strokeWidth="1" 
                            strokeDasharray="5 5"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                        />
                    </svg>

                    {/* SERVICE ICONS */}
                    {categories.map((cat, index) => {
                        const angle = (index * 360) / categories.length;
                        
                        return (
                            <div
                                key={cat.id}
                                className={`service-item ${activeCategory === cat.id ? 'active' : ''}`}
                                style={{
                                    transform: `rotate(${angle}deg) translate(38vmin) rotate(-${angle}deg)`
                                }}
                                onMouseEnter={() => { setIsHovering(true); setActiveCategory(cat.id); }}
                                onMouseLeave={() => { setIsHovering(false); }}
                            >
                                <motion.div 
                                    className="icon-box"
                                    style={{ rotate: negativeRotation }}
                                >
                                    {cat.icon}
                                </motion.div>
                                <motion.div 
                                    className="service-label"
                                    style={{ rotate: negativeRotation }} 
                                >
                                    {cat.name}
                                </motion.div>
                            </div>
                        );
                    })}

                </motion.div>
            </div>

            {/* RIGHT SIDE: INTERACTION & TRUST */}
            <div className="services-right">
                
                {/* Dynamic Highlight Card */}
                <motion.div 
                    className="service-highlight-card"
                    key={activeCategory} // Re-animate on change
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <h4>{categories.find(c => c.id === activeCategory)?.name}</h4>
                    <p style={{ fontSize: '0.9rem', color: '#666' }}>{currentService.label}</p>
                    
                    <div className="stat-row">
                        <div className="stat-item">
                            <span className="stat-label">{t('services.stats.vendors')}</span>
                            <span className="stat-value">{currentService.vendors}+</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">{t('services.stats.starting')}</span>
                            <span className="stat-value">{currentService.price}</span>
                        </div>
                    </div>
                </motion.div>

                {/* How It Works Micro-Guide */}
                <div className="how-it-works">
                    <motion.div className="step-item" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                        <div className="step-number">1</div>
                        <span className="step-text">{t('services.steps.1')}</span>
                    </motion.div>
                    <motion.div className="step-item" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                        <div className="step-number">2</div>
                        <span className="step-text">{t('services.steps.2')}</span>
                    </motion.div>
                    <motion.div className="step-item" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                        <div className="step-number">3</div>
                        <span className="step-text">{t('services.steps.3')}</span>
                    </motion.div>
                </div>

                {/* Trust Badges */}
                <div className="trust-badges">
                    <div className="trust-badge"><ShieldCheck size={16} /> {t('services.trust.verified')}</div>
                    <div className="trust-badge"><Users size={16} /> {t('services.trust.trusted')}</div>
                    <div className="trust-badge"><Lock size={16} /> {t('services.trust.secure')}</div>
                </div>

            </div>

        </div>
    );
}
