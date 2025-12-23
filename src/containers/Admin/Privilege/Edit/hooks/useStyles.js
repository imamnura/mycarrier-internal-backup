import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  loading: {
    paddingTop: '30vh',
    textAlign: 'center',
    width: '100%',
  },
  item: {
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  insertBtn: {
    '& span': {
      '&:hover': {
        cursor: 'pointer',
      },
      alignItems: 'center',
      display: 'flex',
    },
    '& span span': {
      margin: '0px 0px 0px 5px',
      width: 140,
    },
    color: theme.color.green.main,
    display: 'flex',
    paddingBottom: 15,
    width: '100%',
  },
  subItem: {
    // '& span': {
    //   display: 'block'
    // },
    marginBottom: '13px',
  },
  subItemFunc: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  trash: {
    cursor: 'pointer',
    margin: 'auto 10px',
  },
}));

export default useStyles;
