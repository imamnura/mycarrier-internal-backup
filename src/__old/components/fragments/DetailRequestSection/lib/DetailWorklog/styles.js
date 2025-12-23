const styles = (theme) => ({
  box: {
    backgroundColor: theme.color.primary.soft,
    border: `1px solid ${theme.color.primary.main}`,
    borderRadius: 8,
    color: theme.color.primary.main,
    margin: '24px',
    padding: 24,
    textAlign: 'center',
    width: '90%',
  },
  capitalize: {
    paddingLeft: 24,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
    textTransform: 'capitalize',
  },
  textBox: {
    '& span': {
      overflowWrap: 'break-word',
    },
    textAlign: 'justify',
  },
  title: {
    paddingLeft: 24,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
  },
  wrapper: {
    paddingTop: 32,
  },
});

export default styles;
