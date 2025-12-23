import { css } from '@emotion/css';
import color from '@styles/color';

const useHeaderStyles = ({ smClient }) => {
  let smRoot = {};
  let smClickableIcon = {};

  if (smClient) {
    smRoot = {
      padding: '0px 8px',
    };

    smClickableIcon = {
      marginRight: 8,
    };
  }

  return {
    clickableIcon: css({
      '& .icon': {
        height: 24,
        width: 24,
      },
      '&:hover': {
        background: color.primary.soft,
      },
      alignItems: 'center',
      borderRadius: 8,
      cursor: 'pointer',
      display: 'flex',
      height: 40,
      justifyContent: 'center',
      marginRight: 16,
      minHeight: 40,
      minWidth: 40,
      transition: '200ms',
      width: 40,
      border: 'none',
      background: 'white',
      ...smClickableIcon,
    }),
    logo: css({
      height: 30,
      marginRight: 40,
    }),
    middle: css({
      flexGrow: 1,
      margin: 8,
    }),
    root: css({
      alignItems: 'center',
      background: color.white,
      borderBottom: `1px solid ${color.general.light}`,
      display: 'flex',
      height: 72,
      padding: '0px 24px',
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 11,
      gap: 16,
      ...smRoot,
    }),
  };
};

export default useHeaderStyles;
