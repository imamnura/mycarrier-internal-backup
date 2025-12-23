const styles = (theme) => ({
  headerMicrosite: {
    [theme.breakpoints.up('md')]: {
      height: 120,
      top: '-48px',
    },
    '& img': {
      [theme.breakpoints.up('md')]: {
        height: 40,
      },
      height: 24,
    },
    width: '100%',
    borderBottom: `1px solid ${theme.color.general.light}`,
    height: 72,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    position: 'sticky',
    top: '0',
    zIndex: '9',
  },
  containerMicrosite: {},
});

export default styles;
