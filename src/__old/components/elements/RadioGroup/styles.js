const styles = (theme) => ({
  disabled: {
    color: theme.color.general.soft,
  },
  label: {
    color: theme.color.general.mid,
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: '0.015em',
  },
  radio: {
    color: `${theme.color.general.main} !important`,
  },
  radioLabel: {
    color: theme.color.general.main,
    fontSize: 14,
    letterSpacing: '0.0025em',
    textTransform: 'capitalize',
  },
  rootControl: {
    alignItems: 'flex-start',
  },
  rootFormRadio: {
    minWidth: 124,
  },
  rootFormRadioSmall: {
    minWidth: 116,
  },
  xGrey: {
    color: `${theme.color.general.mid} !important`,
  },
});

export default styles;
