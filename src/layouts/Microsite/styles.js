const styles = (theme) => ({
  actionWrapper: {
    [theme.breakpoints.up('md')]: {
      width: '40%',
    },
    width: '100%',
  },
  floatingBar: {
    [theme.breakpoints.up('md')]: {
      padding: '24px',
    },
    borderTop: `1px solid ${theme.color.general.light}`,
    height: 160,
    bottom: 0,
    padding: '24px 24px 48px 24px',
    position: 'fixed',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  header: {
    [theme.breakpoints.up('md')]: {
      height: 120,
    },
    '& img': {
      [theme.breakpoints.up('md')]: {
        height: 40,
      },
      height: 24,
    },
    width: '100%',
    borderBottom: `1px solid ${theme.color.general.light}`,
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  mainPaper: {
    borderRadius: 10,
    padding: '24px 16px',
    width: '100%',
  },
  mainWrapper: {
    [theme.breakpoints.up('md')]: {
      paddingTop: 40,
      width: '40%',
    },
    paddingTop: 55,
    padding: '0px 8px',
    width: '100%',
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflowY: 'auto',
  },
});

export default styles;
