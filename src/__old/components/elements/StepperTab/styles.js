const styles = (theme) => {
  const baseTriangle = {
    borderBottom: '41px solid transparent',
    borderLeft: '48px solid white',
    borderTop: '41px solid transparent',
    bottom: 0,
    content: '""',
    display: 'block',
    height: 0,
    position: 'absolute',
    right: 0,
    width: 0,
    // [theme.breakpoints.down('xs')]: {
    //   borderBottom: '31px solid transparent',
    //   borderLeft: '24px solid white',
    //   borderTop: '31px solid transparent',
    // }
  };

  return {
    item: {
      alignItems: 'center',
      display: 'flex',
      height: 80,
      paddingLeft: 16,
      width: 'calc(100% - 48px)',
      background: 'white',
      // [theme.breakpoints.down('xs')]: {
      //   height: 60,
      //   paddingLeft: 4,
      //   width: 'calc(100% - 24px)',
      // }
    },
    itemActive: {
      backgroundColor: theme.color.primary.soft,
      border: `1px solid ${theme.color.primary.soft}`,
      height: 82,
      marginBottom: -1,
      marginTop: -1,
      // [theme.breakpoints.down('xs')]: {
      //   height: 62,
      // }
    },
    itemClickable: {
      cursor: 'pointer',
    },
    itemCompleted: {
      backgroundColor: theme.color.green.soft,
      border: `1px solid ${theme.color.green.soft}`,
      height: 82,
      marginBottom: -1,
      marginTop: -1,
      // [theme.breakpoints.down('xs')]: {
      //   height: 62,
      // }
    },
    itemDisabled: {
      cursor: 'not-allowed',
    },
    itemFirst: {
      borderRadius: '8px 0px 0px 8px',
    },
    itemLast: {
      borderRadius: '0px 8px 8px 0px',
      width: '100%',
    },
    itemRoot: {
      borderBottom: `1px solid ${theme.color.general.soft}`,
      borderTop: `1px solid ${theme.color.general.soft}`,
    },
    itemRootActive: {
      backgroundColor: theme.color.primary.soft,
    },
    itemRootComplete: {
      backgroundColor: theme.color.green.soft,
    },
    itemRootFirst: {
      borderRadius: '8px 0px 0px 8px',
    },
    itemRootLast: {
      borderRadius: '0px 8px 8px 0px',
      borderRight: `1px solid ${theme.color.general.soft}`,
    },
    label: {
      lineHeight: 'initial',
      paddingLeft: 8,
      zIndex: 5,
    },
    noBorder: {
      border: 'none',
    },
    number: {
      border: '1px solid grey',
      borderRadius: '100%',
      display: 'table',
      fontSize: 20,
      fontWeight: 500,
      height: 32,
      minWidth: 32,
      textAlign: 'center',
      width: 32,
      // [theme.breakpoints.down('xs')]: {
      //   fontSize: 12,
      //   height: 14,
      //   width: 18,
      // }
    },
    numberActive: {
      backgroundColor: theme.color.primary.main,
      borderColor: theme.color.primary.main,
      color: 'white',
    },
    numberComplete: {
      backgroundColor: theme.color.green.main,
      borderColor: theme.color.green.main,
      color: 'white',
    },
    triangle: {
      '&:before': {
        ...baseTriangle,
        filter: 'drop-shadow(1px 0px 0px #B3C3CA)',
      },
      position: 'relative',
      background: 'white',
    },
    triangleActive: {
      '&:before': {
        ...baseTriangle,
        borderLeft: `48px solid ${theme.color.primary.soft}`,
        filter: 'none',
        // [theme.breakpoints.down('xs')]: {
        //   borderBottom: '31px solid transparent',
        //   borderLeft: `24px solid ${theme.color.primary.soft}`,
        //   borderTop: '31px solid transparent',
        // }
      },
    },
    triangleComplete: {
      '&:before': {
        ...baseTriangle,
        borderBottom: '41px solid transparent',
        borderLeft: `48px solid ${theme.color.green.soft}`,
        borderTop: '41px solid transparent',
        filter: 'none',
        // [theme.breakpoints.down('xs')]: {
        //   borderBottom: '31px solid transparent',
        //   borderLeft: `24px solid ${theme.color.green.soft}`,
        //   borderTop: '31px solid transparent',
        // }
      },
    },
  };
};

export default styles;
