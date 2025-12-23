import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = (_mobileClient) => {
  const mobileClient = {
    true: {
      column: 'repeat(2, calc(50% - 8px))',
    },
    false: {
      column: 'repeat(3, calc(33.33% - 11px))',
    },
  }[_mobileClient];

  return makeStyles(() => ({
    dialogRoot: {
      borderRadius: 8,
      overflow: 'auto',
      padding: '16px 24px',
    },
    productContainer: {
      display: 'grid',
      gridTemplateColumns: mobileClient.column,
      gridColumnGap: 16,
      gridRowGap: 16,
    },
    productBox: {
      cursor: 'pointer',
      '&:hover': {
        borderColor: `${color.primary.main} !important`,
      },
      height: '100%',
    },
    selectedBox: {
      borderColor: `${color.primary.main} !important`,
      backgroundColor: `${color.primary.soft}`,
    },
    closeButton: {
      color: color.general.main,
      padding: 0,
    },
    noData: {
      width: '100%',
      height: '280px',
    },
  }))();
};

export default useStyles;
