import { css } from '@emotion/css';

const useStyles = (mobileClient) => {
  return {
    checkbox: css({
      width: '100%',
      '& .legion-checkbox__text': {
        width: '100%',
        marginLeft: '12px',
      },
    }),
    option: css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    }),
    title: css({
      fontSize: '16px',
      fontWeight: 700,
      lineHeight: '24px',
    }),
    root: css({
      margin: '0.5rem 0px',
      borderRadius: '8px',
      backgroundColor: '#fff',
      boxShadow: '0px 0px 2px 0px #00000033, 0px 2px 10px 0px #0000001A',
      padding: '24px',
    }),
    label: css({
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }),
    content: css({
      marginTop: '12px',
    }),
    ulRoot: css({
      margin: 0,
      padding: 0,
    }),
    liRoot: css({
      display: 'block',
      marginBottom: '0.25rem',
    }),
    item: css({
      padding: '14px 16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0px 0px 1px 0px #00000040, 0px 1px 1px 0px #0000000D',
      borderRadius: '4px',
      marginBottom: '8px',
    }),
    itemPrefix: css({
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    }),
    action: css({
      display: 'flex',
      justifyContent: 'center',
      gap: 16,
      marginTop: '24px',
    }),
    modal: css({
      '& .MuiPaper-root': {
        '& .MuiDialogContent-root': {
          padding: '32px 40px',
        },
        borderRadius: '12px',
      },
    }),
    noData: css({
      padding: '16px 16px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0px 0px 1px 0px #00000040, 0px 1px 1px 0px #0000000D',
      borderRadius: '4px',
      marginBottom: '8px',
    }),
    titleWrapper: css({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4,
    }),
    picWrapper: css({
      display: 'flex',
      flexDirection: mobileClient ? 'column' : 'row',
      gap: '16px',
      boxShadow: '0px 6px 9px rgba(46, 67, 77, 0.08)',
      padding: '16px 24px 16px 12px',
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
