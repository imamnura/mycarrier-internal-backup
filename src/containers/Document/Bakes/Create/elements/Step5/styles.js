const styles = (theme) => ({
  customLabelRadio: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 220,
    paddingBottom: 8,
    paddingTop: 7,
  },
  insertButton: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    '& div': {
      backgroundImage: `linear-gradient(to right,
          ${theme.color.general.soft} 76%, rgba(255,255,255,0) 0%)`,
      backgroundPosition: 'bottom',
      backgroundRepeat: 'repeat-x',
      backgroundSize: '16px 1px',
      width: '100%',
    },
    '& span': {
      '&:hover': {
        cursor: 'pointer',
      },
      alignItems: 'center',
      display: 'flex',
      marginBottom: -8,
      paddingLeft: 8,
    },
    '& span span': {
      marginBottom: 0,
      width: 140,
    },
    color: theme.color.green.main,
    display: 'flex',
    paddingBottom: 8,
    paddingTop: 16,
    width: '100%',
  },
  removeButton: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    '& div': {
      backgroundImage: `linear-gradient(to right,
          ${theme.color.general.soft} 76%, rgba(255,255,255,0) 0%)`,
      backgroundPosition: 'bottom',
      backgroundRepeat: 'repeat-x',
      backgroundSize: '16px 1px',
      width: '100%',
    },
    '& span': {
      '&:hover': {
        cursor: 'pointer',
      },
      alignItems: 'center',
      display: 'flex',
      marginBottom: -8,
      paddingLeft: 8,
    },
    '& span span': {
      marginBottom: 0,
      width: 140,
    },
    color: theme.color.primary.main,
    display: 'flex',
    paddingBottom: 8,
    paddingTop: 16,
    width: '100%',
  },
});

export default styles;
