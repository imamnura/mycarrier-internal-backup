const styles = (theme) => ({
  downloadIcon: {
    alignItems: 'center',
    backgroundColor: theme.color.primary.main,
    borderRadius: '100%',
    display: 'flex',
    height: 24,
    justifyContent: 'center',
    transition: '0.2s',
    width: 24,
  },
  file: {
    '&:hover': {
      backgroundColor: theme.color.primary.soft,
      cursor: 'pointer',
    },
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    display: 'flex',
    padding: '8px 16px',
    transition: '0.2s',
  },
  fileWithButton: {
    alignItems: 'center',
    display: 'flex',
  },
  label: {
    textTransform: 'uppercase',
  },
  root: {
    margin: '8px 0px',
  },
});

export default styles;
