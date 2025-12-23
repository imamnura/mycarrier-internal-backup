const styles = (theme) => ({
  closeIcon: {
    color: theme.color.primary.main,
    marginLeft: 8,
    transform: 'rotate(45deg)',
  },
  dropdownWrapper: {
    border: `1px solid ${theme.color.general.main}`,
    borderRadius: 4,
    display: 'flex',
    marginLeft: '30px',
    width: 200,
  },
  formService: {
    margin: '16px auto',
  },
  formServiceFile: {
    margin: '30px auto',
  },
  labelRoot: {
    color: theme.color.general.main,
    fontSize: 14,
  },
  number: {
    borderRadius: '50%',
    color: '#fff',
    display: 'inline-block',
    lineHeight: '40px',
    minHeight: 40,
    minWidth: 40,
    textAlign: 'center',
  },
  numberCircle: {
    background: theme.color.primary.main,
    borderRadius: '100%',
    display: 'inline-block',
    height: 40,
    marginRight: 8,
    textAlign: 'center',
    width: 40,
  },
  rootProducts: {
    alignItems: 'center',
    display: 'flex',
  },
});

export default styles;
