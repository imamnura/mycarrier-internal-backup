import { ASSETS_URL } from '@constants/env';
import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    root: {
      borderTop: 'none',
      background: '#F5F5F5',
    },
    topSection: {
      position: 'relative',
      boxSizing: 'border-box',
    },
    brochureIcon: {
      width: '300px',
      position: 'absolute',
      right: 64,
      bottom: 0,
      zIndex: 0,
    },
    backgroundTop: {
      backgroundImage: `url(${ASSETS_URL}/ewz-mycarrier-pub-dev/public/brochure/brochure-background.png)`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
    },
    disabledSection: {
      backgroundColor: color.white,
      height: '100%',
      left: '0',
      opacity: '0.8',
      position: 'absolute',
      top: '0',
      width: '100%',
      zIndex: '1',
    },
  }))();
};

export default useStyles;
