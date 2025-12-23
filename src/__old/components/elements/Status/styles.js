const styles = (theme) => ({
  blue: {
    backgroundColor: theme.color.blue.soft,
    color: theme.color.blue.main,
  },
  darkOrange: {
    backgroundColor: theme.color.orange.soft,
    color: theme.color.orange.main,
  },
  green: {
    backgroundColor: theme.color.green.soft,
    color: theme.color.green.main,
  },
  grey: {
    backgroundColor: theme.color.general.soft,
    color: theme.color.general.main,
  },
  orange: {
    backgroundColor: theme.color.yellow.soft,
    color: theme.color.yellow.main,
  },
  pink: {
    backgroundColor: theme.color.purple.soft,
    color: theme.color.purple.main,
  },
  red: {
    backgroundColor: theme.color.primary.soft,
    color: theme.color.primary.main,
  },
  root: {
    borderRadius: '4px',
    fontSize: 14,
    fontWeight: 500,
    padding: '4px 8px',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    width: 'fit-content',
  },
});

export default styles;
