const styles = (theme) => ({
  button: {
    width: '100%',
  },
  content: {
    '& div': {
      paddingBottom: 8,
    },
    '& div span': {
      fontWeight: 500,
    },
  },
  contentRoot: {
    padding: 10,
    paddingTop: 16,
  },
  horizontalButton: {
    // padding: '0px 12px !important'
  },
  root: {
    width: 432,
  },
  secondary: {
    color: theme?.color?.grey?.main,
    fontSize: 12,
    fontWeight: 500,
  },
  title: {
    marginTop: -16,
  },
  verticalButton: {
    paddingLeft: '72px !important',
    paddingRight: '72px !important',
  },
});

export default styles;
