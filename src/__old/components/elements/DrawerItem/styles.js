const styles = (theme) => ({
  active: {
    backgroundColor: theme.color.primary.soft,
    borderRadius: '0px 24px 24px 0px',
  },
  emptyLabel: {
    color: 'transparent',
  },
  icon: {
    '&:hover': {
      backgroundColor: theme.color.primary.soft,
      cursor: 'pointer',
    },
    borderRadius: 8,
    height: 40,
    lineHeight: '50px',
    marginLeft: 24,
    textAlign: 'center',
    width: 40,
  },
  iconActive: {
    backgroundColor: theme.color.primary.soft,
  },
  label: {
    alignItems: 'center',
    display: 'flex',
    height: 40,
    paddingLeft: 16,
  },
  root: {
    '&:hover': {
      backgroundColor: theme.color.primary.soft,
      borderRadius: '0px 24px 24px 0px',
      cursor: 'pointer',
    },
    display: 'flex',
    textDecoration: 'none',
    userSelect: 'none',
  },
});

export default styles;
