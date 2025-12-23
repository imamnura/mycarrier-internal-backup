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
  padding: '10px 20px',
};

const useStyles = makeStyles((theme) => ({
  action: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '24px',
  },
  icon: {
    color: theme.color.general.light,
    marginRight: 24,
    width: 78,
    height: 78,
    '&:hover': {
      fill: theme.color.primary.main,
    },
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
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  notFirstItem: {
    marginTop: '16px',
  },
}));

export default useStyles;
