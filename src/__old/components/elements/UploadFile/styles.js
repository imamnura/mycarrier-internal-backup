const styles = (theme) => ({
  boxLabel: {
    backgroundColor: theme.color.white,
    border: `1px dashed ${theme.color.grey.main}`,
    borderRadius: 4,
    display: 'flex',
    padding: 10,
    width: '100%',
  },
  boxLabelError: {
    border: `1px dashed ${theme.color.primary.main}`,
  },
  boxLabelFocus: {
    backgroundColor: theme.color.primary.soft,
    border: 'none',
  },
  fileName: {
    flexGrow: 1,
    fontSize: 14,
  },
  iconSuccess: {
    color: theme.color.green.main,
    margin: -2,
    padding: 5,
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
  placeholder: {
    color: theme.color.grey.main,
  },
  root: {
    display: 'flex',
  },
});

export default styles;
