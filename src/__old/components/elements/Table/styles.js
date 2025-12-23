const styles = (theme) => ({
  body: {
    borderBottom: `1px solid ${theme.color.general.soft}`,
    color: theme.color.general.main,
    fontSize: 14,
    height: 76,
    lineHeight: '14px',
    padding: 8,
  },
  cpname: {
    minWidth: 100,
  },
  emptyContainer: {
    maxWidth: 400,
    paddingTop: 16,
    textAlign: 'center',
  },
  emptyData: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '180px 72px',
  },
  footerRoot: {
    padding: 16,
  },
  head: {
    borderBottom: `1px solid ${theme.color.general.soft}`,
    color: theme.color.general.main,
    fontSize: 12,
    fontWeight: 'bold',
    height: 60,
    lineHeight: '14px',
    padding: 8,
    textTransform: 'uppercase',
  },
  hover: {
    '&:hover': {
      '& td': {
        color: theme.color.primary.main,
        transition: '0.2s',
      },
      '& td summary span': {
        color: theme.color.primary.main,
        transition: '0.2s',
      },
      backgroundColor: theme.color.primary.soft + ' !important',
      transition: '0.3s',
    },
    cursor: 'pointer',
  },
  loading: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: 72,
  },
  meta: {
    backgroundColor: theme.color.white,
    borderTop: `1px solid ${theme.color.general.soft}`,
    bottom: 0,
    padding: 8,
    position: 'sticky',
    textAlign: 'right',
    width: '100%',
  },
  numbering: {
    color: theme.color.general.main,
    padding: '8px 16px',
  },
  oneLine: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  root: {
    width: '100%',
  },
  sid: {
    maxWidth: 100,
    wordWrap: 'break-word',
  },
  sortActive: {
    color: theme.color.general.main + ' !important',
  },
  sortLabel: {
    margin: 0,
    padding: 0,
  },
  status: {
    width: 180,
  },
  tableHead: {
    backgroundColor: theme.color.white,
    height: 60,
  },
});

export default styles;
