import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = ({ isHaveError }) => {
  return makeStyles(() => ({
    header: {
      minHeight: '48px !important',
    },
    headerContent: {
      margin: '0 !important',
    },
    icon: {
      color: isHaveError ? color.primary.main : color.green.main,
      height: 24,
      width: 24,
    },
    item: {
      alignItems: 'center',
      display: 'flex',
      gap: 8,
    },
    itemSuccess: {
      color: color.green.main,
    },
    root: {
      background: isHaveError ? color.primary.soft : color.green.soft,
      boxShadow: 'none',
      color: isHaveError ? color.primary.main : color.green.main,
    },
    rootRound: {
      borderRadius: '8px !important',
    },
    itemRoot: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    },
    number: {
      background: color.primary.main,
      width: 24,
      height: 24,
      borderRadius: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }))();
};

export default useStyles;
