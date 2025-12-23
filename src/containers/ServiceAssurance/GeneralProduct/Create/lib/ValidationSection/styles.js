import { makeStyles } from '@material-ui/core';
// import color from '../../../styles/color';
const useStyles = () => {
  // let colorVariant = color.general.main;
  return makeStyles(() => ({
    boxContainer: {
      display: 'flex',
    },
    buttonBox: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '20%',
    },
    buttonValidate: {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingRight: 15,
      width: '20%',
    },
    checkboxBox: {
      paddingLeft: 30,
      width: '80%',
    },
    inputField: {
      width: '80%',
    },
  }))();
};

export default useStyles;
