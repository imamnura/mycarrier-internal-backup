const styles = (theme) => ({
  edit: {
    alignItems: 'center',
    backgroundColor: theme.color.primary.main,
    borderRadius: '100%',
    display: 'inline-flex',
    height: 24,
    justifyContent: 'center',
    marginLeft: '20px',
    transition: '0.2s',
    width: 24,
  },
  label: {
    textTransform: 'uppercase',
  },
  lowercase: {
    textTransform: 'none !important',
  },
  root: {
    wordBreak: 'break-all',
  },
  rootMargin: {
    margin: '8px 0px',
    wordBreak: 'break-all',
  },
  text: {
    textTransform: 'capitalize',
  },
});

export default styles;
