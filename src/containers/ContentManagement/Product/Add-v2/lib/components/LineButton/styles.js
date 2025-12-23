import { makeStyles } from '@material-ui/core';

const styles = () => {
  return makeStyles(() => ({
    buttonSection: {
      '& p': {
        fontSize: 14,
        letterSpacing: '0.01em',
        marginLeft: '5px',
      },
      alignItems: 'center',
      display: 'flex',
      fontWeight: 'bold',
      width: 250,
    },
    buttonWrapper: {
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
      margin: '16px 0',
    },
    line: {
      marginRight: '10px',
      width: '100%',
    },
  }))();
};

export default styles;
