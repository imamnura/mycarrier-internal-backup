const styles = (theme) => ({
  baseInput: {
    '&::placeholder': {
      color: theme.color.general.mid,
      opacity: 1,
    },
    '&:focus': {
      borderColor: theme.color.general.main,
    },
    backgroundColor: theme.color.white,
    border: `1px solid #D2DADE`,
    borderRadius: 8,
    color: theme.color.general.main,
    fontSize: 16,
    fontWeight: '500',
    height: 38,
    padding: '0px 8px 0px 40px',
    position: 'relative',
  },
  icon: {
    color: '#3B525C',
    left: 0,
    margin: '0px 8px',
    position: 'absolute',
    zIndex: 1,
  },
  noBorder: {
    border: 'none',
  },
});

export default styles;
