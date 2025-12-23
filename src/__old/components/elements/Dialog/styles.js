const styles = (theme) => ({
  closeIcon: {
    '&:hover': {
      color: theme.color.primary.main,
    },
    color: theme.color.black,
    cursor: 'pointer',
    fontSize: 18,
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 1,
  },
  dialogContent: {
    paddingBottom: 24,
    paddingTop: 24,
  },
  fullwidth: {
    borderRadius: 16,
    overflowX: 'hidden',
  },
});

export default styles;
