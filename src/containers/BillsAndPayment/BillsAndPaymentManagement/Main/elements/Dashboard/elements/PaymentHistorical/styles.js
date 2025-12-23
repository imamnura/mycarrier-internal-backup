import color from '@styles/color';
import { css } from '@emotion/css';

const useStyles = ({ mobileClient }) => {
  return {
    container: css({
      border: `1px solid ${color.general.light}`,
      marginRight: -1,
      borderRadius: 8,
      display: 'flex',
      flexDirection: mobileClient ? 'column' : 'row',
      marginBottom: 32,
      position: 'relative',
      marginTop: '24px',
    }),
    calendarSection: css({
      borderBottom: !mobileClient ? 'none' : `1px solid ${color.general.light}`,
      borderRight: mobileClient ? 'none' : `1px solid ${color.general.light}`,
      maxWidth: '100%',
      minWidth: 'fit-content',
      paddingTop: 4,
    }),
    uploadButton: css({
      padding: '0px 20px',
      height: 38,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      border: '1px solid #DE1B1B',
      cursor: 'pointer',
      '&:hover': {
        background: color.primary.soft,
      },
    }),
  };
};

export default useStyles;
