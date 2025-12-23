import { ASSETS_URL } from '@constants/env';
import { makeStyles } from '@material-ui/core';

const useStyles = () => {
  return makeStyles(() => ({
    btnTalk: {
      '& span': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    contentImage: {
      display: 'flex',
      flex: 1,
      justifyContent: 'flex-end',
      marginRight: '5px',
    },
    swapperSection: {
      padding: '60px 64px 32px',
      position: 'relative',
    },

    wrapperSectionTalk: {
      alignItems: 'center',
      backgroundImage: `url(${ASSETS_URL}/ewz-mytens-pub-prod/catalogpublic/mycarrier/assets/metro-ethernet/bg-call-back.jpg)`,
      backgroundSize: 'cover',
      borderRadius: '14px',
      display: 'flex',
      position: 'relative',
      minHeight: 130,
      justifyContent: 'space-between',
      padding: '20px 36px',
    },
  }))();
};

export default useStyles;
