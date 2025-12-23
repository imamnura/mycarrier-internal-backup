const styles = (theme) => ({
  content: {
    border: `1px solid ${theme.color.general.soft}`,
    borderRadius: 10,
    marginBottom: 16,
    marginTop: 12,
    padding: 16,
  },
  itemContainer: {
    padding: '5px 0',
  },
  itemWrapper: {
    margin: '5px 0',
  },
  number: {
    fontSize: 14,
    lineHeight: '22px',
    minHeight: 22,
    minWidth: 22,
  },
  numberCircle: {
    height: 22,
    margin: 0,
    marginRight: 12,
    width: 22,
  },
});

export default styles;
