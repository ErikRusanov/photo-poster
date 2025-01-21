import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { styles } from '../styles';
import { Logo } from '../components/Logo';

export const AppPage = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    
    // Проверяем размер файла (10MB максимум)
    if (file.size > 10 * 1024 * 1024) {
      setError('Изображение слишком большое. Максимальный размер: 10MB');
      return;
    }
    
    // Проверяем тип файла
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      setError('Неподдерживаемый формат изображения. Используйте JPG, PNG или JPEG');
      return;
    }
    
    setFile(file);
    setPreview(URL.createObjectURL(file));
    setError(''); // Сбрасываем ошибку при успешной загрузке
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', file);
    if (description) {
      formData.append('description', description);
    }

    try {
      const response = await axios.post('http://localhost:8000/api/generate-post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000,
      });
      
      if (response.data && response.data.generated_text) {
        // Убираем только лишние пробелы, сохраняем переносы строк
        const formattedText = response.data.generated_text
          .trim()
          .replace(/[ \t]+/g, ' '); // Заменяем множественные пробелы на один
        setGeneratedText(formattedText);
      } else {
        throw new Error('Некорректный ответ от сервера');
      }
    } catch (err) {
      let errorMessage = 'Произошла ошибка при генерации подписи';
      
      if (err.response) {
        // Ошибка от сервера
        if (err.response.status === 413) {
          errorMessage = 'Изображение слишком большое. Максимальный размер: 10MB';
        } else if (err.response.status === 415) {
          errorMessage = 'Неподдерживаемый формат изображения. Используйте JPG, PNG или JPEG';
        } else if (err.response.data?.detail) {
          errorMessage = err.response.data.detail;
        }
      } else if (err.code === 'ECONNABORTED') {
        errorMessage = 'Превышено время ожидания ответа. Попробуйте еще раз';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formatText = (text) => {
    // Заменяем одиночные переносы строк на двойные для markdown
    return text.replace(/\n/g, '\n\n').trim();
  };

  return (
    <Box sx={styles.container}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={styles.paper}>
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
            <Logo size="medium" />
          </Box>
          <Typography variant="h5" gutterBottom align="center" sx={{ 
            color: '#666',
            mb: 4,
            fontSize: { xs: '1rem', sm: '1.2rem' }
          }}>
            Загрузите фото и ИИ создаст идеальную подпись
          </Typography>

          <div {...getRootProps()} style={styles.dropzone}>
            <input {...getInputProps()} />
            <Typography sx={{ color: '#666' }}>
              Перетащите изображение сюда или нажмите для выбора
            </Typography>
          </div>

          {preview && (
            <Box sx={{ textAlign: 'center' }}>
              <img src={preview} alt="Preview" style={styles.preview} />
            </Box>
          )}

          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            label="Дополнительное описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                '& fieldset': {
                  borderColor: '#8c52ff40',
                },
                '&:hover fieldset': {
                  borderColor: '#8c52ff',
                },
              },
            }}
          />

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                ...styles.button,
                width: { xs: '100%', sm: 'auto' }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Создать'}
            </Button>
          </Box>

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error === 'Please select an image first' ? 'Пожалуйста, выберите изображение' : 
                error.startsWith('Error generating post:') ? error.replace('Error generating post:', 'Ошибка:') : error}
            </Typography>
          )}

          {generatedText && (
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                mt: 3, 
                borderRadius: '15px',
                background: 'rgba(140, 82, 255, 0.03)',
                border: '1px solid #8c52ff20'
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: '#8c52ff' }}>
                Сгенерированная подпись
              </Typography>
              <Box sx={{ 
                color: '#666',
                whiteSpace: 'pre-line',
                lineHeight: 1.3,
                '& p': { 
                  margin: '0.3em 0',
                  whiteSpace: 'pre-line',
                  lineHeight: 1.3
                },
                '& ul, & ol': {
                  paddingLeft: '20px',
                  margin: '0.3em 0',
                  listStyle: 'none',
                  '& li': {
                    position: 'relative',
                    paddingLeft: '15px',
                    marginBottom: '0.1em',
                    lineHeight: 1.2,
                    display: 'flex',
                    alignItems: 'center',
                    '&::before': {
                      content: '"•"',
                      position: 'absolute',
                      left: 0,
                      display: 'flex',
                      alignItems: 'center',
                      height: '100%',
                      color: '#666'
                    }
                  }
                },
                '& a': { 
                  color: '#8c52ff',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                },
                '& img': {
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '8px'
                },
                '& blockquote': {
                  borderLeft: '3px solid #8c52ff40',
                  margin: '0.5em 0',
                  paddingLeft: '1em',
                  color: '#666'
                },
                '& code': {
                  background: '#8c52ff15',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '0.9em'
                },
                '& pre': {
                  background: '#8c52ff0a',
                  padding: '1em',
                  borderRadius: '8px',
                  overflowX: 'auto'
                }
              }}>
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({node, ...props}) => (
                      <p style={{whiteSpace: 'pre-line', lineHeight: 1.3, margin: '0.3em 0'}} {...props} />
                    ),
                    li: ({node, ...props}) => (
                      <li style={{
                        position: 'relative',
                        paddingLeft: '15px',
                        marginBottom: '0.1em',
                        lineHeight: 1.2,
                        display: 'flex',
                        alignItems: 'center'
                      }} {...props} />
                    ),
                  }}
                >
                  {formatText(generatedText)}
                </ReactMarkdown>
              </Box>
            </Paper>
          )}
        </Paper>
      </Container>
    </Box>
  );
}; 