const styles = (theme) => ({
  boxLabel: {
    backgroundColor: theme.color.white,
    border: `1px dashed ${theme.color.primary.main}`,
    borderRadius: 12,
    display: 'flex',
    padding: '80px 10px',
    width: '100%',
    textAlign: 'center',
  },
  boxLabelFocus: {
    backgroundColor: theme.color.primary.soft,
    border: 'none',
  },
  iconSuccess: {
    color: theme.color.green.main,
    margin: -2,
    padding: 5,
  },
  icon: {
    color: '#B3C3CA',
    width: 67,
    height: 67,
    marginBottom: 36,
  },
  info: {
    color: theme.color.grey.main,
    fontSize: 12,
    fontWeight: 500,
  },
  label: {
    color: theme.color.black,
    fontSize: 14,
    fontWeight: 400,
    textAlign: 'left',
    width: '100%',
  },
  root: {
    display: 'flex',
  },
});

export default styles;
