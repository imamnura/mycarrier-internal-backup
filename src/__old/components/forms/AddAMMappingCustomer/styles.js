const styles = (theme) => {
  const baseLabel = {
    borderRadius: '12px',
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
    emptyContainer: {
      maxWidth: '25em',
      textAlign: 'center',
    },
    emptyData: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    footerButton: {
      direction: 'row',
      justifyContent: 'center',
    },
    footerDialog: {
      alignItems: 'center',
      direction: 'row',
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '12px',
      marginTop: '12px',
    },
    header: {
      display: 'block',
      marginBottom: '15px',
      textAlign: 'center',
    },
    item: {
      flex: 1,
      marginTop: '12px',
    },
    label: {
      ...baseLabel,
      border: `1px solid ${theme.color.general.soft}`,
      cursor: 'pointer',
    },
    labelActive: {
      ...baseLabel,
      backgroundColor: theme.color.primary.soft,
      color: theme.color.general.main,
    },
    labelContainer: {
      color: theme.color.grey.main,
      display: 'block',
      marginBottom: '24px',
      marginTop: '12px',
    },
    searchWrapper: {
      cursor: 'pointer',
    },
    subitem: {
      '& span': {
        display: 'block',
      },
      marginBottom: '12px',
    },
  };
};

export default styles;
