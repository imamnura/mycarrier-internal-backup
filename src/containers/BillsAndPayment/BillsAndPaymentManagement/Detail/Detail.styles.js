import { image } from '@configs/index';
import { css } from '@emotion/css';

const useDetailStyles = ({ smClient }) => {
  return {
    gridContainer: css({
      display: 'grid',
      gridTemplateColumns: smClient ? '1fr' : '2fr 1fr',
      gridGap: 32,
    }),
    osBalanceBg: css({
      backgroundImage: `url(${image.BackgroundWave})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right',
      backgroundSize: 'auto 100%',
      border: '1px solid #D2D8DA',
      borderRadius: ' 8px',
      display: 'flex',
      justifyContent: 'space-between',
      gap: '16px',
      alignItems: 'center',
      padding: '24px',
    }),
  };
};

export default useDetailStyles;
