import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    dialogRoot: {
      borderRadius: 16,
      overflow: 'visible',
    },
    noData: {
      height: '120px !important',
      width: '120px !important',
    },
    notFound: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
    },
    circle: {
      height: '4px',
      width: '4px',
      backgroundColor: '#D2D8DA',
      borderRadius: '50%',
      display: 'inline-block',
      marginInline: '5px',
    },
    trashIcon: {
      cursor: 'pointer',
      '&:hover': {
        color: color.primary.dark,
      },
    },
    boxPic: {
      margin: '8px 0',
      padding: '8px 16px',
      borderRadius: '4px',
      backgroundColor: 'white',
      boxShadow:
        '0px 0px 1px 0px rgba(0, 0, 0, 0.25), 0px 1px 1px 0px rgba(0, 0, 0, 0.05)',
    },
    icon: {
      height: 16,
      width: 16,
      stroke: 1,
    },
  }))();
};

export default useStyles;
