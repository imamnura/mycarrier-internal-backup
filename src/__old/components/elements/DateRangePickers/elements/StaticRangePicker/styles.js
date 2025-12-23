const styles = (theme) => {
  const { primary = {} } = theme.color || {};

  return {
    calendarWrapper: {
      // border: '2px solid rgba(0, 0, 0, 0.12)',
      display: 'inline-flex',
    },
    root: {
      height: 350,
      width: '100%',
    },
    suggestItem: {
      '&:hover': {
        backgroundColor: 'rgba(228, 72, 72, 0.6)',
        color: 'white',
        cursor: 'pointer',
      },
      borderRadius: 4,
      display: 'flex',
      marginTop: 2,
      padding: '4px 24px 4px 16px',
      transition: '0.1s',
    },
    suggestItemActive: {
      '&:hover': {
        backgroundColor: primary.main,
        cursor: 'pointer',
      },
      backgroundColor: primary.main,
      color: 'white',
    },
    suggestMenu: {
      display: 'flex',
      flexDirection: 'column',
      padding: '8px 32px 8px 0px',
    },
    suggestWrapper: {
      // border: '2px solid rgba(0, 0, 0, 0.12)',
      borderRight: 'none',
      display: 'inline-flex',
    },
  };
};

export default styles;
