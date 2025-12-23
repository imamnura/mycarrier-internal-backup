const styles = (theme) => ({
  bottomDivider: {
    backgroundColor: theme.color.general.soft,
    height: 1,
    marginTop: -1,
    width: '100%',
  },
  centerItem: {
    display: 'flex',
    justifyContent: 'center',
  },
  defaultItem: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  rightItem: {
    display: 'block',
    flexGrow: 1,
    paddingBottom: 1,
  },
  tabRoot: {
    color: theme.color.general.mid,
    fontFamily: 'Titillium Web',
    fontSize: 14,
    fontWeight: 500,
    marginRight: 40,
    minHeight: 40,
    minWidth: 0,
    padding: 0,
    textAlign: 'left',
    textTransform: 'none',
  },
  tabSelected: {
    color: theme.color.primary.main,
  },
  tabsIndicator: {
    backgroundColor: theme.color.primary.main,
    height: 1,
  },
  tabsRoot: {
    minHeight: 40,
    minWidth: 0,
  },
  tabWrapper: {
    alignItems: 'flex-start',
  },
});

export default styles;
