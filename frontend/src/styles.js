export const styles = {
  landing: {
    background: 'linear-gradient(135deg, #f3e6ff 0%, #e0ccff 100%)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
  },
  container: {
    background: 'linear-gradient(135deg, #f3e6ff 0%, #e0ccff 100%)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
  },
  paper: {
    padding: '40px',
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  },
  demoPhone: {
    width: '100%',
    height: '100%',
    background: 'white',
    borderRadius: '30px',
    padding: { xs: '15px', sm: '20px' },
    boxShadow: '0 20px 40px rgba(140, 82, 255, 0.2)',
    position: 'relative',
    overflow: 'hidden',
    margin: 0,
    border: { xs: '8px solid #f3f3f3', sm: '12px solid #f3f3f3' },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  demoContent: {
    width: '100%',
    padding: { xs: '20px', sm: '30px' },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: { xs: '12px', sm: '20px' },
    padding: { xs: '15px', sm: '20px' },
    borderRadius: '15px',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 15px rgba(140, 82, 255, 0.1)',
    width: '100%',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(140, 82, 255, 0.15)',
    },
  },
  featureIcon: {
    width: { xs: '32px', sm: '40px' },
    height: { xs: '32px', sm: '40px' },
    minWidth: { xs: '32px', sm: '40px' },
    fontSize: { xs: '16px', sm: '20px' },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    background: 'linear-gradient(45deg, #8c52ff 30%, #5ce1e6 90%)',
    color: 'white',
  },
  title: {
    color: '#8c52ff',
    fontWeight: 600,
    marginBottom: '30px',
  },
  dropzone: {
    border: '2px dashed #8c52ff',
    borderRadius: '15px',
    padding: '30px',
    textAlign: 'center',
    cursor: 'pointer',
    marginBottom: '20px',
    background: 'rgba(140, 82, 255, 0.03)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(140, 82, 255, 0.06)',
    },
  },
  preview: {
    maxWidth: '100%',
    maxHeight: '300px',
    marginBottom: '20px',
    borderRadius: '10px',
  },
  button: {
    background: 'linear-gradient(45deg, #8c52ff 30%, #5ce1e6 90%)',
    borderRadius: '25px',
    padding: '12px 35px',
    color: 'white',
    textTransform: 'none',
    fontSize: '16px',
    boxShadow: '0 3px 15px rgba(140, 82, 255, 0.3)',
    '&:hover': {
      background: 'linear-gradient(45deg, #7b46e3 30%, #4bc9ce 90%)',
    },
  },
  markdown: {
    whiteSpace: 'pre-line',
    '& p': { 
      margin: '0.5em 0',
      whiteSpace: 'pre-line'
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
    '& ul, & ol': {
      paddingLeft: '20px',
      margin: '0.5em 0'
    },
    '& blockquote': {
      borderLeft: '3px solid #8c52ff40',
      margin: '1em 0',
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
    },
    '& h1, & h2, & h3, & h4, & h5, & h6': {
      color: '#8c52ff',
      margin: '1em 0 0.5em 0'
    },
    '& hr': {
      border: 'none',
      borderTop: '1px solid #8c52ff20',
      margin: '1em 0'
    },
    '& table': {
      borderCollapse: 'collapse',
      width: '100%',
      margin: '1em 0'
    },
    '& th, & td': {
      border: '1px solid #8c52ff20',
      padding: '8px',
      textAlign: 'left'
    },
    '& th': {
      background: '#8c52ff0a'
    }
  }
}; 