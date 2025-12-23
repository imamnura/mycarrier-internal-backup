import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useCardStyles = ({ border }) => {
  return makeStyles(() => ({
    root: {
      background: 'white',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      borderRadius: 8,
      border: border ? `1px solid ${color.general.light}` : 'none',
    },
    header: {
      display: 'flex',
      gap: 16,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerCustom: {
      padding: '24px 24px 0 24px',
      display: 'flex',
      gap: 16,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  }))();
};

export default useCardStyles;
