const styles = (theme) => ({
  downloadIcon: {
    borderRadius: '100%',
    height: 24,
    padding: '3px 5px',
    transition: '0.2s',
    width: 24,
  },
  file: {
    '&:hover': {
      '& div div': {
        backgroundColor: theme.color.primary.main,
      },
      backgroundColor: theme.color.primary.soft,
      cursor: 'pointer',
    },
    borderRadius: 4,
    padding: 16,
    transition: '0.2s',
  },
  image: {
    background: 'white',
    borderRadius: 8,
    height: 160,
    objectFit: 'cover',
    width: 160,
  },
  label: {
    textTransform: 'uppercase',
  },
  root: {
    margin: '8px 0px',
    width: 200,
  },
});

export default styles;
