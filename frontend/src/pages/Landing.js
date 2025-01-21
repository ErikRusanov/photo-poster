import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { DemoAnimation } from '../components/DemoAnimation';
import { AnimatedButton } from '../components/AnimatedButton';
import { styles } from '../styles';
import { Logo } from '../components/Logo';

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <Box sx={styles.landing}>
      <Container maxWidth="lg" sx={{ 
        minHeight: '100vh',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        py: { xs: 4, sm: 0 }
      }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          width: '100%'
        }}>
          <Box sx={{ mb: 6 }}>
            <Logo size="large" />
          </Box>
          <Typography variant="h5" sx={{ 
            color: '#666', 
            mb: { xs: 3, sm: 6 },
            maxWidth: '800px',
            textAlign: 'center',
            fontSize: { xs: '1rem', sm: '1.5rem' },
            px: { xs: 2, sm: 0 }
          }}>
            Создавайте привлекательные подписи для социальных сетей мгновенно с помощью ИИ
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            alignItems: 'stretch',
            gap: { xs: 3, md: 6 },
            flexDirection: { xs: 'column', md: 'row' },
            width: '100%',
            maxWidth: '1000px',
            justifyContent: 'center',
            px: { xs: 2, sm: 3, md: 0 }
          }}>
            <Box sx={{ 
              flex: 1,
              display: 'flex',
              minHeight: { md: '350px' },
            }}>
              <DemoAnimation />
            </Box>

            <Box sx={{ 
              flex: 1,
              display: 'flex', 
              flexDirection: 'column', 
              gap: 2,
              justifyContent: 'space-between'
            }}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}>
                <Box sx={styles.feature}>
                  <Box sx={styles.featureIcon}>📸</Box>
                  <Typography>
                    Загрузите фото и позвольте ИИ проанализировать его
                  </Typography>
                </Box>
                <Box sx={styles.feature}>
                  <Box sx={styles.featureIcon}>🤖</Box>
                  <Typography>
                    Продвинутый ИИ создаст привлекательное описание
                  </Typography>
                </Box>
                <Box sx={styles.feature}>
                  <Box sx={styles.featureIcon}>✨</Box>
                  <Typography>
                    Получите идеальные подписи для ваших постов
                  </Typography>
                </Box>
              </Box>

              <AnimatedButton
                onClick={() => navigate('/app')}
                sx={{
                  ...styles.button,
                  mt: 2,
                  width: { xs: '100%', sm: 'auto' }
                }}
              >
                Попробовать
              </AnimatedButton>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}; 