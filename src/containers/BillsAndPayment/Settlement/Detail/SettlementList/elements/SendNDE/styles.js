import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = ({ approvalType }) => {
  return makeStyles(() => ({
    dialogRoot: {
      borderRadius: 16,
      padding: '32px 40px',
      width: approvalType ? 1192 : 432,
    },
    actionDivider: {
      background: color.general.light,
      height: 24,
      marginLeft: 16,
      marginRight: 16,
      width: 1,
    },
    dashed: {
      border: `1px dashed ${color.general.light}`,
      width: '100%',
    },
  }))();
};

export default useStyles;
