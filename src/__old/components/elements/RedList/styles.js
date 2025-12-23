const styles = (theme) => ({
  itemContainer: {
    display: 'flex',
    padding: '12px 0',
  },
  itemWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  number: {
    borderRadius: '50%',
    color: '#fff',
    display: 'inline-block',
    lineHeight: '40px',
    minHeight: 40,
    minWidth: 40,
    textAlign: 'center',
  },
  numberCircle: {
    background: theme.color.primary.main,
    borderRadius: '100%',
    display: 'inline-block',
    height: 40,
    margin: 4,
    marginRight: 24,
    textAlign: 'center',
    width: 40,
  },
  wrapper: {
    paddingTop: 32,
  },
});

export default styles;
