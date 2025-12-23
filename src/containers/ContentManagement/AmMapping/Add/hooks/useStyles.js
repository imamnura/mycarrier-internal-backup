import color from '@styles/color';

const useStyles = () => {
  const baseLabel = {
    borderRadius: '12px',
    marginLeft: '6px',
    padding: '4px 12px',
  };

  return {
    content: {
      display: 'flex',
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
    item: {
      flex: 1,
      marginTop: '12px',
    },
    label: {
      ...baseLabel,
      border: `1px solid ${color.general.soft}`,
    },
    labelActive: {
      ...baseLabel,
      backgroundColor: color.primary.soft,
      border: `1px solid ${color.primary.soft}`,
      color: color.general.main,
    },
    labelContainer: {
      color: color.grey.main,
      display: 'block',
      marginTop: '12px',
    },
    searchWrapper: {
      cursor: 'pointer',
      marginBottom: '24px',
    },
    subitem: {
      '& span': {
        display: 'block',
      },
      marginBottom: '12px',
    },
    subtitle: {
      marginBottom: '12px',
    },
  };
};

export default useStyles;
