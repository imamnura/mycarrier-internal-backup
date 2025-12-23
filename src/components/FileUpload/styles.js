import { makeStyles } from '@material-ui/core';
import color from '../../styles/color';

const blue = {
  main: '#3366FF',
  soft: '#EBF0FF',
  softDark: '#D6E0FF',
};

const useStyles = ({ disabled, error, isDragAccept }) => {
  let helperColor = color.general.mid;
  let labelColor = color.general.mid;
  let borderColor = blue.main;
  let bgColor = blue.soft;
  let resultColor = color.primary.soft;

  if (disabled) {
    helperColor = color.general.light;
    labelColor = color.general.light;
    borderColor = color.general.light;
    resultColor = color.general.soft;
  }

  if (error) {
    helperColor = color.primary.main;
    labelColor = color.primary.main;
  }

  if (isDragAccept) {
    bgColor = blue.softDark;
  }

  return makeStyles(() => ({
    helper: {
      alignItems: 'center',
      color: helperColor,
      display: 'flex',
      justifyContent: 'space-between',
      minHeight: 18,
      paddingTop: 4,
      textAlign: 'left',
      width: '100%',
    },
    label: {
      color: `${labelColor} !important`,
    },
    required: {
      marginRight: 2,
    },
    uploader: {
      '&:hover': {
        background: blue.softDark,
      },
      alignItems: 'center',
      background: bgColor,
      border: `1px dashed ${borderColor}`,
      borderRadius: 4,
      boxSizing: 'border-box',
      cursor: 'pointer',
      display: 'flex',
      height: 40,
      marginBottom: 4,
      marginTop: 8,
      padding: '0px 16px',
      transition: '200ms',
      justifyContent: 'space-between',
      width: '100%',
    },
    fileResult: {
      alignItems: 'center',
      background: resultColor,
      border: `1px dashed ${color.primary.soft}`,
      borderRadius: 4,
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'space-between',
      height: 40,
      marginBottom: 4,
      marginTop: 8,
      padding: '0px 16px',
    },
    fileLabel: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    deleteButton: {
      padding: 6,
      color: color.general.main,
      marginRight: -6,
    },
  }))();
};

export default useStyles;
