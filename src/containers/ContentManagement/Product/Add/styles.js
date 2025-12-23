const styles = (theme) => {
  return {
    chip: {
      marginBottom: '10px',
      marginLeft: '5px',
    },
    container: {
      maxWidth: '1112px',
    },
    correct: {
      alignItems: 'center',
      backgroundColor: '#3BA064',
      borderRadius: '18px',
      color: '#FFFFFF',
      display: 'flex',
      fontSize: '12px',
      fontWeight: '500',
      padding: '3px 8px',
    },
    header: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '12px',
    },
    input: {
      marginBottom: '24px',
    },
    item: {
      flex: 1,
      marginRight: '4px',
    },
    questionDesc: {
      color: '#78858B',
      fontSize: 10,
      fontStyle: 'italic',
      letterSpacing: '0.015em',
      lineHeight: '12px',
    },
    subitem: {
      marginBottom: '13px',
    },
    submitContainer: {
      [theme.breakpoints.down('sm')]: {
        marginTop: '20px',
      },
      display: 'flex',
    },
    subtitle: {
      marginBottom: '24px',
    },
    wrapper: {
      marginBottom: '13px',
      marginTop: '24px',
    },
    wrapperAction: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'flex-start',
    },
    wrapperDropList: {
      minHeight: '30px',
    },
  };
};

export default styles;
