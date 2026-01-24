import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import prev1 from '../../../assets/prev 1.mp4';
import prev2 from '../../../assets/prev 2.mp4';
import prevNew from '../../../assets/prev.new.mp4';

const PreviousEvents = () => {
    const { t } = useTranslation();

    const events = [
        { video: prev1, title: t('previous_events.events.royal') },
        { video: prev2, title: t('previous_events.events.grand') },
        { video: prevNew, title: t('previous_events.events.magical') }
    ];

    return (
        <section id="previous-events" style={{ 
            padding: '6rem 2rem', 
            background: 'var(--color-ivory)',
            borderTop: '1px solid var(--color-gold)' 
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <h2 style={{
                        fontSize: '3rem',
                        color: 'var(--color-text)',
                        marginBottom: '1rem',
                        fontFamily: 'var(--font-royal)',
                        fontWeight: '700'
                    }}>{t('previous_events.title')}</h2>
                    <div style={{ width: '100px', height: '4px', backgroundColor: 'var(--color-kumkum)', margin: '0 auto', borderRadius: '2px' }}></div>
                    <p style={{ marginTop: '1.5rem', color: '#666', fontSize: '1.2rem' }}>
                        {t('previous_events.subtitle')}
                    </p>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                }}>
                    {events.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            style={{
                                aspectRatio: '16/9',
                                backgroundColor: '#000',
                                borderRadius: '15px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                            }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <video
                                src={item.video}
                                muted
                                loop
                                autoPlay
                                playsInline
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PreviousEvents;
