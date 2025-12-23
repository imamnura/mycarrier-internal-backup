const styles = (theme) => ({
  detailContainer: {
    boxSizing: 'border-box',
    paddingRight: '16px',
    width: 'fit-content',
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
    '&:hover > div:first-child': {
      backgroundColor: theme.color.primary.soft,
      // cursor: 'pointer'
    },
    alignContent: 'center',
    alignItems: 'center',
    display: 'flex',
    transition: '0.2s',
  },
  fileDetail: {
    display: 'flex',
    alignItems: 'center',
    background: '#FFF',
    padding: '8px 16px',
    borderRadius: 4,
    justifyContent: 'space-between',
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
    margin: '20px 0 0',
  },
});

export default styles;
