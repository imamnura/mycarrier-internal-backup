import { makeStyles } from '@material-ui/core/styles';

const section = {
  '& p': {
    fontSize: 16,
    fontWeight: 500,
  },
  alignItems: 'center',
  border: `1px solid #B3C3CA`,
  borderRadius: 16,
  cursor: 'pointer',
  display: 'flex',
  margin: '0 25px 16px 25px',
  padding: '10px 20px',
};

const useStyles = (theme) => {
  return makeStyles(() => ({
    actionContainer: {
      '& svg': {
        color: theme.color.general.main,
        cursor: 'pointer',
        marginLeft: '12px',
      },
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      color: theme.color.general.light,
      marginRight: 16,
    },
    iconActive: {
      color: theme.color.primary.main,
    },
    sectionItem: {
      ...section,
      '&:hover': {
        backgroundColor: theme.color.primary.soft,
        border: `1px solid ${theme.color.primary.soft}`,
        color: theme.color.primary.main,
      },
    },
    sectionItemActive: {
      ...section,
      backgroundColor: theme.color.primary.soft,
      border: `1px solid ${theme.color.primary.soft}`,
      color: theme.color.primary.main,
    },
  }));
};

export default useStyles;
