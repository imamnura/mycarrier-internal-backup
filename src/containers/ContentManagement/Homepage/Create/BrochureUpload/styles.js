const styles = (theme) => ({
  header: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: '24px',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  inputField: {
    marginBottom: '24px',
  },
  subtitle: {
    display: 'flex',
    flexFlow: 'column',
    margin: '24px 0',
  },
});

export default styles;
