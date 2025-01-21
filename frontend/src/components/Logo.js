import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const Logo = ({ size = 'medium' }) => {
  const sizes = {
    small: {
      height: '32px',
      fontSize: '1.2rem',
    },
    medium: {
      height: '40px',
      fontSize: '1.5rem',
    },
    large: {
      height: '48px',
      fontSize: '2rem',
    }
  };

  return (
    <Link to="/" style={{ textDecoration: 'none' }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px'
      }}>
        <Box
          sx={{
            height: sizes[size].height,
            width: sizes[size].height,
            background: 'linear-gradient(45deg, #8c52ff 30%, #5ce1e6 90%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: sizes[size].fontSize,
            fontWeight: 'bold',
            boxShadow: '0 3px 15px rgba(140, 82, 255, 0.2)',
          }}
        >
          PP
        </Box>
        <Typography
          sx={{
            fontSize: sizes[size].fontSize,
            fontWeight: 600,
            background: 'linear-gradient(45deg, #8c52ff 30%, #5ce1e6 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Photo Poster
        </Typography>
      </Box>
    </Link>
  );
}; 