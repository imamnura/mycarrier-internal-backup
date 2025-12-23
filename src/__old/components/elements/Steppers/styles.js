const styles = (theme) => {
  const { primary, green, white, general } = theme.color || {};
  return {
    completedText: {
      color: primary.main,
      fontSize: 12,
      fontWeight: 400,
      margin: 0,
    },
    connectorGreen: {
      '& $connectorLine': {
        borderColor: `${green.main} !important`,
      },
    },
    connectorLine: {
      borderColor: general.light,
      transition: theme.transitions.create('border-color'),
      width: '100%',
    },
    connectorRed: {
      '& $connectorLine': {
        borderColor: `${primary.main} !important`,
      },
    },
    connectorYellow: {
      '& $connectorLine': {
        borderColor: `#FAB005 !important`,
      },
    },
    connectorRoot: {
      left: '-49%',
      top: 10,
      width: '97%',
      zIndex: 0,
    },
    connectorWeight: {
      borderWidth: 2,
    },
    icon: {
      backgroundColor: white,
    },
    iconCompleted: {
      fill: green.main,
    },
    iconNormal: {
      color: white,
    },
    iconRed: {
      fill: primary.main,
    },
    iconStep: {
      zIndex: 1,
    },
    label: {
      color: general.light,
      fontWeight: '400 !important',
      lineHeight: '14px',
      marginTop: '0.5rem !important',
    },
    labelActive: {
      color: `${primary.main} !important`,
      marginTop: '0.5rem !important',
    },
    labelYellow: {
      color: `#FAB005 !important`,
      marginTop: '0.5rem !important',
    },
    labelCompleted: {
      color: `${green.main} !important`,
    },
    root: {
      overflow: 'auto',
      padding: '24px 0px',
    },
  };
};

export default styles;
