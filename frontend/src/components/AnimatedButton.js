import React from 'react';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';

export const AnimatedButton = ({ onClick, children, sx }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 15
      }}
    >
      <Button
        variant="contained"
        onClick={onClick}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '200%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            animation: 'shimmer 2s infinite',
          },
          '@keyframes shimmer': {
            '0%': {
              left: '-100%',
            },
            '100%': {
              left: '100%',
            },
          },
          ...sx
        }}
      >
        {children}
      </Button>
    </motion.div>
  );
}; 