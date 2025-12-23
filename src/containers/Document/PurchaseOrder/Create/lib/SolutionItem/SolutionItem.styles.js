import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useButtonStyles = (_mobileClient) => {
  const mobileClient = {
    container: {
      justifyContent: 'flex-start',
      gap: '24px',
      width: '100%',
    },
  };

  return makeStyles(() => ({
    box: {
      '& .legion-textfield': {
        width: '100%',
      },
      '& .legion-textarea': {
        display: 'inline !important',
        '& textarea': {
          height: '44px',
          maxHeight: 'max-content',
        },
      },
    },
    closeButton: {
      color: color.general.main,
      padding: 0,
    },
    deleteIcon: {
      color: color.primary.main,
    },
    divider: {
      borderTop: '2px dashed #B3C3CA',
      height: '2px',
      width: 'calc(100% - 142px)',
    },
    durationField: {
      '& .legion-textfield': {
        '& .legion-textfield__inner': {
          '& input': {
            width: '60px',
          },
        },
      },
    },
    smallField: {
      '& .legion-textfield': {
        '& .legion-textfield__inner': {
          '& input': {
            width: '80px',
          },
        },
      },
    },
    container: {
      justifyContent: 'space-between',
      width: '50%',
      padding: '0px 8px',
      ...(_mobileClient && mobileClient.container),
    },
  }))();
};

export default useButtonStyles;
