import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    dialogRoot: {
      borderRadius: 16,
      padding: '32px 40px',
      width: 776,
      overflowY: 'visible',
    },
    chooseProduct: {
      '& > svg': {
        width: 16,
        color: color.general.main,
        marginLeft: 16,
      },
      '&:hover': {
        background: color.primary.soft,
      },
      alignItems: 'center',
      borderRadius: 8,
      cursor: 'pointer',
      display: 'flex',
      height: 43,
      justifyContent: 'space-between',
      padding: 16,
      top: 20,
      transition: '200ms',
      width: 'max-content',
      zIndex: 2,
    },
  }))();
};

export default useStyles;
