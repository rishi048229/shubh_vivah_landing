import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Store, ShieldCheck, CalendarHeart, TrendingUp, UserCheck, Smartphone, IndianRupee } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './AboutUs.css';

const AboutUs = () => {
    const { t } = useTranslation();

    const points = [
        {
            icon: <Store size={28} />,
            title: t('about_us.points.ecosystem.title'),
            desc: t('about_us.points.ecosystem.desc')
        },
        {
            icon: <Users size={28} />,
            title: t('about_us.points.families.title'),
            desc: t('about_us.points.families.desc')
        },
        {
            icon: <TrendingUp size={28} />,
            title: t('about_us.points.vendors.title'),
            desc: t('about_us.points.vendors.desc')
        },
        {
            icon: <ShieldCheck size={28} />,
            title: t('about_us.points.charges.title'),
            desc: t('about_us.points.charges.desc')
        },
        {
            icon: <CalendarHeart size={28} />,
            title: t('about_us.points.planning.title'),
            desc: t('about_us.points.planning.desc')
        },
        {
            icon: <Heart size={28} />,
            title: t('about_us.points.local.title'),
            desc: t('about_us.points.local.desc')
        },
        {
            icon: <UserCheck size={28} />,
            title: t('about_us.points.trusted.title'),
            desc: t('about_us.points.trusted.desc')
        },
        {
            icon: <Smartphone size={28} />,
            title: t('about_us.points.tech.title'),
            desc: t('about_us.points.tech.desc')
        },
        {
            icon: <IndianRupee size={28} />,
            title: t('about_us.points.affordable.title'),
            desc: t('about_us.points.affordable.desc')
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section className="about-us-section" id="about-us">
            <div className="about-us-container">
                
                {/* Header */}
                <motion.div 
                    className="about-header"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h4 className="about-subtitle">{t('about_us.subtitle')}</h4>
                    <h2 className="about-title">{t('about_us.title')}</h2>
                    <div className="about-divider"></div>
                </motion.div>

                {/* Intro */}
                <motion.p 
                    className="about-intro"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    {t('about_us.intro')}
                </motion.p>

                {/* Grid */}
                <motion.div 
                    className="about-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {points.map((point, index) => (
                        <motion.div 
                            key={index} 
                            className="about-card"
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                        >
                            <div className="about-icon-wrapper">
                                {point.icon}
                            </div>
                            <h3 className="about-card-title">{point.title}</h3>
                            <p className="about-card-desc">{point.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default AboutUs;
