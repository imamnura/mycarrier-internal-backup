const styles = (theme) => {
  const baseLabel = {
    borderRadius: '12px',
    cursor: 'pointer',
    marginLeft: '6px',
    padding: '4px 12px',
  };

  return {
    cancel: {
      marginRight: '12px',
    },
    content: {
      display: 'flex',
    },
    deleteButton: {
      '& span': {
        color: theme.color.primary.main,
        fontSize: 14,
        fontWeight: 500,
      },
      backgroundColor: theme.color.primary.soft,
      borderRadius: '6px',
      cursor: 'pointer',
      padding: '6px 12px',
    },
    editButton: {
      '& button': {
        marginRight: '12px',
      },
      display: 'flex',
      justifyContent: 'flex-end',
    },
    emptyContainer: {
      maxWidth: 400,
      paddingTop: 16,
      textAlign: 'center',
    },
    emptyData: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '180px 72px',
    },
    header: {
      display: 'flex',
      marginBottom: '12px',
    },
    item: {
      flex: 1,
      marginRight: '4px',
      marginTop: '12px',
    },
    label: {
      ...baseLabel,
      border: `1px solid ${theme.color.general.soft}`,
    },
    labelActive: {
      ...baseLabel,
      backgroundColor: theme.color.primary.soft,
      border: `1px solid ${theme.color.general.soft}`,
      color: theme.color.general.main,
    },
    labelContainer: {
      color: theme.color.grey.main,
      display: 'block',
      marginTop: '12px',
    },
    mb1: {
      marginBottom: 8,
    },
    profileTitle: {
      '& span': {
        marginRight: '12px',
      },
      alignItems: 'flex-end',
      display: 'flex',
    },
    searchWrapper: {
      marginBottom: '24px',
    },
    subitem: {
      '& span': {
        display: 'block',
      },
      marginBottom: '12px',
      width: '100%',
    },
    submitContainer: {
      [theme.breakpoints.down('sm')]: {
        marginTop: '20px',
      },
    },
    subtitle: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '12px',
    },
    text: {
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      paddingRight: '12px',
    },
    textField: {
      paddingRight: '12px',
    },
    toggleContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    wrapper: {
      marginTop: '24px',
    },
  };
};

export default styles;
