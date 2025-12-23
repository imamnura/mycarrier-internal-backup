import { makeStyles } from '@material-ui/core';
import { importantCss } from '@utils/common';
import color from '../../styles/color';

const useStyles = ({ variant }) => {
  return makeStyles(() => ({
    root: {
      padding: 0,
      background: 'transparent',
    },
    iconContainer: {
      zIndex: 3,
    },
    stepIdle: {
      color: importantCss(color.general.light),
    },
    stepError: {
      color: importantCss(color.primary.main),
    },
    stepWarning: {
      color: importantCss(color.yellow.main),
    },
    stepWrapper: {
      overflowX: 'auto',
      paddingBottom: '16px',
    },
    stepSuccess: {
      color: importantCss(color.green.main),
    },
    label: {
      marginTop: importantCss('8px'),
    },
    clickableLabel: {
      cursor: 'pointer',
      '&:hover': {
        color: `${color.primary.mid} !important`,
      },
    },
    disabledLabel: {
      cursor: 'not-allowed',
    },
    connector: {
      '& > span': {
        borderTopWidth: variant === 'number' ? 1 : 2,
      },
      top: '11.5px',
      right: '50%',
      left: '-50%',
    },
    connectorIdle: {
      '& > span': {
        borderColor: color.general.light,
      },
    },
    connectorError: {
      '& > span': {
        borderColor: color.primary.main,
      },
    },
    connectorWarning: {
      '& > span': {
        borderColor: color.yellow.main,
      },
    },
    connectorSuccess: {
      '& > span': {
        borderColor: color.green.main,
      },
    },
    icon: {
      width: 24,
      height: 24,
    },
  }))();
};

export default useStyles;
