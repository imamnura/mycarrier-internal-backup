import { makeStyles } from '@material-ui/core';

const useStyles = ({ height }) => {
  return makeStyles(() => ({
    root: {
      height,
      width: '100%',
    },
    legendContainer: {
      '& > div': {
        margin: '0px 8px',
      },
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      paddingLeft: 40,
    },
  }))();
};

export default useStyles;
