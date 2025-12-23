const styles = (theme) => {
  const { green, general } = theme.color || {};
  return {
    contentLast: {
      borderLeft: 'none !important',
    },
    contentRoot: {
      borderLeft: `2px solid ${general.light}`,
      marginBottom: -8,
      marginLeft: 11,
      marginTop: -8,
      paddingBottom: 24,
      paddingTop: 8,
    },
    stepIcon: {
      backgroundColor: general.light,
      // border: `3px solid ${general.light}`,
      borderRadius: '100%',
      height: 16,
      marginLeft: 4,
      marginRight: 4,
      width: 16,
    },
    stepIconActive: {
      backgroundColor: green.main,
      // border: `3px solid ${primary.light}`,
    },
  };
};

export default styles;
