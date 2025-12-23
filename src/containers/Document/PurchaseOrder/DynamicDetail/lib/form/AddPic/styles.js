import { css } from '@emotion/css';

const useStyles = (mobileClient) => {
  return {
    modal: css({
      '& .legion-modal__dialog': {
        padding: '24px 32px',
        width: mobileClient ? '80%' : '700px',
      },
    }),
    action: css({
      display: 'flex',
      justifyContent: 'end',
      gap: 16,
      marginTop: '24px',
    }),
    picWrapper: css({
      display: 'flex',
      flexDirection: mobileClient ? 'column' : 'row',
      gap: '16px',
      marginTop: '8px',
      borderRadius: '4px',
      alignItems: 'start',
    }),
    buttonWrapper: css({
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      marginTop: '24px',
    }),
    border: css({
      flex: 'auto',
      borderTop: '2px dashed #B3C3CA',
    }),
    button: css({
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      cursor: 'pointer',
    }),
  };
};

export default useStyles;
