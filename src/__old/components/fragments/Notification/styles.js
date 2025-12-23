const styles = (theme) => ({
  body: {
    '&:hover': {
      backgroundColor: theme.color.primary.soft,
      cursor: 'pointer',
    },
    padding: '16px 24px',
    textDecoration: 'none',
    transition: '0.3s',
  },
  bodyUnread: {
    backgroundColor: theme.color.primary.soft,
  },
  content: {
    '& strong': {
      color: theme.color.general.dark,
    },
  },
  header: {
    borderBottom: `1px solid ${theme.color.general.soft}`,
    padding: '16px 24px',
  },
  icon: {
    '& svg': {
      color: 'white',
    },
    backgroundColor: theme.color.primary.main,
    borderRadius: '100%',
    height: 40,
    padding: 10,
    width: 40,
  },
  listWrapper: {
    height: '72vh',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  wrapper: {
    borderRadius: 8,
    width: 344,
  },
});

export default styles;
