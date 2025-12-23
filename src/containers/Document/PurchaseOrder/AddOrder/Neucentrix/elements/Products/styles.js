import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    productsHeading: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    productsEmpty: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      marginTop: '1.5rem',
    },
    productsEmptyMessage: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    productsModalAddService: {
      display: 'block',
      maxWidth: '30rem',
      overflowX: 'hidden',
      height: '100%',
      borderRadius: '1rem',
      padding: '2rem',
      margin: '.5rem auto',
      background: color.white,
      position: 'relative',
    },
    productsModalAddServiceTitle: {
      textAlign: 'center',
    },
    roundedBox: {
      border: `1px solid ${color.grey.soft}`,
      padding: '1rem',
      borderRadius: '.5rem',
      marginBottom: '1rem',
      marginTop: '1rem',
    },
    stepTwoModalWidth: {
      maxWidth: '33.125rem',
    },
  }))();
};

export default useStyles;
