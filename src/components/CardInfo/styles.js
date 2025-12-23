import color from '@styles/color';
import { css } from '@emotion/css';

const useStyles = ({ design, variant, isActive, minWidth, illustration }) => {
  const baseBox = {
    basic: {
      cursor: 'pointer',
    },
  }[design];

  const activeBaseBox = {
    true: {
      backgroundColor: color.secondary[25],
      border: `1px solid ${color.secondary[300]}`,
    },
    false: {
      border: `1px solid ${color.general.soft}`,
    },
  }[isActive];

  const additionalStyle = {
    general: {
      borderBottom: `4px solid ${color.general.main}`,
    },
    information: {
      borderBottom: `4px solid #3366FF`,
    },
    success: {
      borderBottom: `4px solid #52BD94`,
    },
    warning: {
      borderBottom: `4px solid #FFB020`,
    },
    primary: {
      borderBottom: `4px solid #DE1B1B`,
    },
    error: {
      borderBottom: `4px solid #F04438`,
    },
    illustration: {
      background: illustration ? `url(${illustration})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: '100% 0',
      backgroundRepeat: 'no-repeat',
    },
  }[variant];

  return {
    baseBox: css({
      ...baseBox,
      ...activeBaseBox,
      borderRadius: 8,
      width: '100%',
      minWidth: minWidth,
    }),
    mainBox: css({
      ...additionalStyle,
      borderRadius: 8,
      boxSizing: 'border-box',
      padding: '16px 16px 12px 16px',
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
    }),
    action: css({
      cursor: 'pointer',
      userSelect: 'none',
    }),
  };
};

export default useStyles;
