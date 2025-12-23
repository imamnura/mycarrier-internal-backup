const styles = (theme) => {
  const { color: { general = {}, primary = {} } = {} } = theme || {};

  return {
    helperError: {
      color: `${primary.main} !important`,
      fontSize: 10,
    },
    inputDisabled: {
      color: general.light,
    },
    inputRoot: {
      '&:not(.Mui-disabled):hover::before': {
        borderBottom: `1px solid ${general.main}`,
      },
      color: general.main,
      fontSize: 14,
      lineHeight: '1.5',
    },
    inputUnderline: {
      '&:after': {
        borderBottom: `1px solid ${general.main}`,
      },
      '&:before': {
        borderBottom: `1px solid ${general.mid}`,
      },
    },
    inputUnderlineDisabled: {
      '&:before': {
        borderBottom: `1px solid ${general.light}`,
        borderBottomStyle: 'solid !important',
      },
    },
    labelDisabled: {
      color: `${general.light} !important`,
    },
    labelFocused: {
      color: `${general.main} !important`,
    },
    labelRoot: {
      color: general.mid,
      fontSize: 14,
    },
    labelShrink: {
      fontWeight: 500,
      transform: 'translate(0, 6px) scale(0.8)',
    },
    labelxError: {
      color: `${primary.main} !important`,
    },
  };
};

export default styles;
