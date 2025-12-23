import color from '@styles/color';
import { css } from '@emotion/css';

const useStyles = ({ value }) => {
  let bgColor = color.primary.soft;
  let fontColor = color.primary.main;

  if (value === 10) {
    bgColor = color.green.soft;
    fontColor = color.green.main;
  } else if (value >= 8) {
    bgColor = color.yellow.soft;
    fontColor = color.yellow.main;
  }

  return {
    root: css({
      background: bgColor,
      color: fontColor,
      width: 'min-content',
      height: 'min-content',
      marginTop: '2px',
      padding: '4px 8px',
      borderRadius: '6px',
    }),
  };
};

export default useStyles;
