import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, UserCheck, HeartHandshake, Users, Lock, IndianRupee, CalendarCheck, ScrollText, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './WhyUs.css';
import RosePetalBlast from "../../../components/RosePetalBlast";
import { ArrowRight, MessageCircle, Bell } from 'lucide-react';

const WhyUs = () => {
    const { t } = useTranslation();

    const features = [
        {
            icon: <ShieldCheck size={24} />,
            title: t('why_us.features.verified.title'),
            subtitle: t('why_us.features.verified.subtitle'),
            description: t('why_us.features.verified.desc'),
            ctaText: t('why_us.features.verified.cta')
        },
        {
            icon: <UserCheck size={24} />,
            title: t('why_us.features.kundali.title'),
            subtitle: t('why_us.features.kundali.subtitle'),
            description: t('why_us.features.kundali.desc'),
            ctaText: t('why_us.features.kundali.cta')
        },
        {
            icon: <HeartHandshake size={24} />,
            title: t('why_us.features.matches.title'),
            subtitle: t('why_us.features.matches.subtitle'),
            description: t('why_us.features.matches.desc'),
            ctaText: t('why_us.features.matches.cta')
        },
        {
            icon: <Users size={24} />,
            title: t('why_us.features.family.title'),
            subtitle: t('why_us.features.family.subtitle'),
            description: t('why_us.features.family.desc'),
            ctaText: t('why_us.features.family.cta')
        },
        {
            icon: <Lock size={24} />,
            title: t('why_us.features.privacy.title'),
            subtitle: t('why_us.features.privacy.subtitle'),
            description: t('why_us.features.privacy.desc'),
            ctaText: t('why_us.features.privacy.cta')
        },
        {
            icon: <CalendarCheck size={24} />,
            title: t('why_us.features.event.title'),
            subtitle: t('why_us.features.event.subtitle'),
            description: t('why_us.features.event.desc'),
            ctaText: t('why_us.features.event.cta')
        },
        {
            icon: <ScrollText size={24} />,
            title: t('why_us.features.pandit.title'),
            subtitle: t('why_us.features.pandit.subtitle'),
            description: t('why_us.features.pandit.desc'),
            ctaText: t('why_us.features.pandit.cta')
        },
        {
            icon: <Sparkles size={24} />,
            title: t('why_us.features.wedding.title'),
            subtitle: t('why_us.features.wedding.subtitle'),
            description: t('why_us.features.wedding.desc'),
            ctaText: t('why_us.features.wedding.cta')
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section className="why-us-section" id="why-us" style={{ 
            background: 'linear-gradient(135deg, var(--color-ivory) 0%, #fff8e1 50%, #ffe0b2 100%)',
            position: 'relative' 
        }}>
            {/* ROSE PETAL BLAST EFFECT */}
            <RosePetalBlast />
            
            {/* Background Elements for Depth */}
            <div className="why-us-bg-blob blob-1"></div>
            <div className="why-us-bg-blob blob-2"></div>

            <div className="why-us-container">
                <motion.div 
                    className="why-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <h2>{t('why_us.title')}</h2>
                    <p>{t('why_us.subtitle')}</p>
                </motion.div>

                <motion.div 
                    className="features-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {features.map((feature, index) => (
                        <motion.div 
                            key={index} 
                            className="glass-card"
                            variants={itemVariants}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                        >
                            <div className="glass-card-content">
                                <div className="card-header">
                                    <div className="icon-wrapper-glass">
                                        {feature.icon}
                                    </div>
                                    <span className="card-badge">{feature.subtitle}</span>
                                </div>
                                
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                                
                                <div className="card-actions">
                                    <button className="primary-glass-btn">
                                        {feature.ctaText} <ArrowRight size={16} />
                                    </button>
                                    <div className="secondary-actions">
                                        <button className="icon-glass-btn"><MessageCircle size={18} /></button>
                                        <button className="icon-glass-btn"><Bell size={18} /></button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default WhyUs;
