const styles = (theme) => {
  return {
    content: {
      '& h2': {
        color: '#111E24',
        fontSize: '24px',
        fontWeight: 'normal',
        lineHeight: '28px',
        maxWidth: '587px',
      },
      alignItems: 'center',
      display: 'flex',
    },
    contentImage: {
      display: 'flex',
      flex: 1,
      justifyContent: 'flex-end',
      marginRight: '5px',
    },
    contentImageLeft: {
      display: 'flex',
      flex: 1,
      justifyContent: 'start',
      marginLeft: '5px',
    },
    contentText: {
      flex: 2,
    },
    default: {
      alignItems: 'center',
      display: 'flex',
    },
    defaultWithTabs: {
      alignItems: 'center',
      paddingBottom: '16px',
    },
    descContent: {
      color: '#3B525C',
      fontSize: '16px',
      fontWeight: '300',
      letterSpacing: '0.0015em',
      lineHeight: '28px',
      margin: '1em 0',
      maxWidth: '587px',
    },
    textAlert: {
      color: theme.color.primary.main,
    },
  };
};

export default styles;
