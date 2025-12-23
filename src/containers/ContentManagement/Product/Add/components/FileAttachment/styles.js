const styles = (theme) => ({
  detailContainer: {
    boxSizing: 'border-box',
    paddingRight: '16px',
  },
  downloadIcon: {
    '&:hover': {
      cursor: 'pointer',
    },
    alignItems: 'center',
    borderRadius: '100%',
    display: 'flex',
    height: 32,
    justifyContent: 'center',
    transition: '0.2s',
    width: 32,
  },
  file: {
    '&:hover': {
      backgroundColor: theme.color.primary.soft,
      // cursor: 'pointer'
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
    '&:hover': {
      cursor: 'pointer',
    },
    borderRadius: '50%',
    textTransform: 'uppercase',
    margin: '0 8px',
    padding: '2px',
  },
  root: {
    margin: '8px 0px',
  },
});

export default styles;
