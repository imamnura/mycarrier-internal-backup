const styles = (theme) => {
  const baseLabel = {
    borderRadius: '12px',
    marginLeft: '6px',
    padding: '4px 12px',
  };

  const baseCard = {
    alignItems: 'center',
    border: '1px solid #B3C3CA',
    borderRadius: '16px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '16px 0',
    padding: '24px',
  };

  return {
    caption: {
      display: 'block',
      lineHeight: '28px',
      margin: 'auto',
      marginBottom: '12px',
      width: '80%',
    },
    card: {
      '&:hover': {
        backgroundColor: theme.color.primary.soft,
        border: `1px solid ${theme.color.primary.soft}`,
      },
      ...baseCard,
    },
    cardName: {
      color: '#111E24',
      display: 'block',
      lineHeight: '19px',
    },
    cardSelected: {
      ...baseCard,
      backgroundColor: theme.color.primary.soft,
      border: `1px solid ${theme.color.primary.soft}`,
    },
    cardStatus: {
      borderRadius: '4px',
      display: 'block',
      padding: '4px 8px',
    },
    content: {
      display: 'flex',
      wordBreak: 'break-word',
    },
    dropdown: {
      alignItems: 'center',
      display: 'flex',
      marginLeft: '24px',
    },
    emptyContainer: {
      maxWidth: 400,
      textAlign: 'center',
    },
    emptyData: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '10px 72px',
    },
    formControl: {
      '& :before': {
        borderBottom: 'none',
      },
      marginLeft: '20px',
    },
    header: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      paddingBottom: '14px',
    },
    input: {
      marginBottom: '24px',
    },
    label: {
      ...baseLabel,
      border: `1px solid ${theme.color.general.soft}`,
    },
    labelActive: {
      ...baseLabel,
      backgroundColor: theme.color.primary.soft,
      border: `1px solid ${theme.color.primary.soft}`,
      color: theme.color.general.main,
    },
    labelContainer: {
      color: theme.color.grey.main,
      display: 'block',
      marginTop: '25px',
    },
    option: {
      '&:hover': {
        backgroundColor: theme.color.primary.soft,
        border: `1px solid ${theme.color.primary.soft}`,
      },
      alignItems: 'center',
      border: `1px solid ${theme.color.general.soft}`,
      borderRadius: '10px',
      cursor: 'pointer',
      display: 'flex',
      margin: '16px 0',
      padding: '20px',
    },
    profileTitle: {
      '& span': {
        marginRight: '5px',
      },
      alignItems: 'flex-end',
      display: 'flex',
    },
    question: {
      border: `1px solid ${theme.color.general.soft}`,
      borderRadius: '12px',
      marginTop: '30px',
      padding: '40px 50px',
      textAlign: 'center',
    },
    questionBtn: {
      display: 'flex',
      marginTop: '1em',
      justifyContent: 'center',
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
    searchWrapper: {
      cursor: 'pointer',
      margin: '24px 0',
    },
    subitem: {
      '& span': {
        display: 'block',
      },
      marginBottom: '20px',
    },
    subtitle: {
      marginBottom: '22px',
      marginTop: '24px',
    },
  };
};

export default styles;
