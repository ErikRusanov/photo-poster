import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { styles } from '../styles';

export const DemoAnimation = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    {
      icon: "📸",
      title: "Загрузка фото",
      animation: {
        icon: { scale: [1, 1.2, 1], transition: { repeat: Infinity, duration: 1.5 } },
        content: { y: [0, -5, 0], transition: { repeat: Infinity, duration: 2 } }
      }
    },
    {
      icon: "🤖",
      title: "Обработка ИИ",
      animation: {
        icon: { rotate: [0, 360], transition: { repeat: Infinity, duration: 2, ease: "linear" } },
        content: { scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 1.5 } }
      }
    },
    {
      icon: "✨",
      title: "Генерация текста",
      animation: {
        icon: { opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9], transition: { repeat: Infinity, duration: 1.5 } },
        content: { x: [-2, 2, -2], transition: { repeat: Infinity, duration: 1.5 } }
      }
    },
    {
      icon: "🚀",
      title: "Готово!",
      animation: {
        icon: { y: [0, -10, 0], transition: { repeat: Infinity, duration: 1 } },
        content: { scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 2 } }
      }
    }
  ];

  return (
    <motion.div style={styles.demoPhone}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          style={styles.demoContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h6" sx={{ 
            color: '#8c52ff', 
            mb: 2, 
            fontWeight: 600,
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}>
            {steps[step].title}
          </Typography>
          
          <Box sx={{
            width: { xs: '160px', sm: '200px' },
            height: { xs: '160px', sm: '200px' },
            background: 'linear-gradient(135deg, rgba(140, 82, 255, 0.1) 0%, rgba(92, 225, 230, 0.1) 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <motion.div
              animate={steps[step].animation.icon}
              style={{ 
                display: 'flex', 
                fontSize: { xs: '2.5rem', sm: '3.5rem' }
              }}
            >
              {steps[step].icon}
            </motion.div>
          </Box>

          <motion.div
            animate={steps[step].animation.content}
            style={{
              width: '80%',
              height: '8px',
              background: 'linear-gradient(90deg, #8c52ff 0%, #5ce1e6 100%)',
              borderRadius: '4px',
              marginTop: '20px'
            }}
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}; 