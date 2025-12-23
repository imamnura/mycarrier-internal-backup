const styles = (theme) => ({
  buttonAdd: {
    '&:hover': {
      opacity: 0.9,
    },
    backgroundColor: theme.color.green.main,
  },
  buttonCircle: {
    '&:hover': {
      cursor: 'pointer',
    },
    borderRadius: '100%',
    color: 'white',
    height: 40,
    marginTop: 22,
    padding: 8,
    width: 40,
  },
  buttonDel: {
    '&:hover': {
      opacity: 0.9,
    },
    backgroundColor: theme.color.red,
  },
  buttonNoMargin: {
    marginTop: 0,
  },
  subTitle: {
    color: theme.color.grey.main,
    fontSize: 12,
  },
});

export default styles;
