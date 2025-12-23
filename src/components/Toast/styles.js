import { makeStyles } from '@material-ui/core';
import color from '../../styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    container: {
      gap: '5px',
      width: '484px',
      display: 'flex',
      maxWidth: '100%',
      flexWrap: 'nowrap',
      borderRadius: '8px',
      padding: '16px 24px',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow:
        '0px 4px 20px 0px rgba(0, 0, 0, 0.15), 0px 0px 3px 0px rgba(0, 0, 0, 0.10)',
    },
    bgSuccess: {
      background: color.green.dark,
    },
    bgError: {
      background: color.primary.main,
    },
    closeButton: { color: 'white', width: '16px', height: '16px' },
  }))();
};

export default useStyles;
