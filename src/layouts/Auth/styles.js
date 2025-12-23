import { makeStyles } from '@material-ui/core';
import { image } from '../../configs';

const useStyles = () => {
  return makeStyles(() => ({
    banner: {
      background: 'url(' + image.banner + ')',
      backgroundSize: 'cover',
      height: '100vh',
    },
    centered: {
      alignItems: 'center',
      display: 'flex',
      height: '100vh',
      justifyContent: 'center',
      textAlign: 'center',
    },
    mainWrapper: {
      // minWidth: 320,
      margin: 16,
      maxWidth: 320,
      width: '100%',
    },
  }))();
};

export default useStyles;
