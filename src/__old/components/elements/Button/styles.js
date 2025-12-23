const styles = (theme) => {
  const { general = {}, primary = {}, white } = theme.color || {};

  const baseButton = {
    '& span': {
      whiteSpace: 'nowrap',
    },
    borderRadius: 4,
    padding: 0,
    paddingLeft: 16,
    paddingRight: 16,
  };

  return {
    defaultSize: {
      height: 32,
    },
    fullWidth: {
      minWidth: 'auto !important',
      width: '100%',
    },
    ghost: {
      ...baseButton,
      '&:focus': {
        backgroundColor: primary.dark,
        color: white,
      },
      '&:hover': {
        backgroundColor: primary.mid,
        color: white,
      },
      backgroundColor: 'transparent',
      border: 'none',
      color: primary.main,
    },
    ghostDisabled: {
      color: general.mid,
    },
    label: {
      color: 'transparent',
    },
    largeSize: {
      height: 48,
    },
    primaryLoading: {
      color: '#FFFFFF',
      position: 'absolute',
    },
    secondaryLoading: {
      color: general.mid,
      position: 'absolute',
    },
    ghostLoading: {
      color: '#FFFFFF',
      position: 'absolute',
    },
    mediumSize: {
      height: 40,
    },
    primary: {
      ...baseButton,
      '&:focus': {
        backgroundColor: primary.dark,
      },
      '&:hover': {
        backgroundColor: primary.mid,
      },
      backgroundColor: primary.main,
      color: white,
    },
    primaryDisabled: {
      backgroundColor: general.light,
      borderColor: general.light,
      color: white,
    },
    secondary: {
      ...baseButton,
      '&:focus': {
        backgroundColor: primary.dark,
        borderColor: primary.dark,
        color: white,
      },
      '&:hover': {
        backgroundColor: primary.mid,
        borderColor: primary.mid,
        color: white,
      },
      backgroundColor: 'transparent',
      border: `solid 1px ${primary.main}`,
      color: primary.main,
    },
    secondaryDisabled: {
      borderColor: general.mid,
      color: general.mid,
    },
  };
};

export default styles;
