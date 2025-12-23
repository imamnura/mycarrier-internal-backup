const styles = () => ({
  bottomBar: {
    background: 'white',
    border: '1px solid #CCCCCC',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopColor: 'white',
    marginTop: -5,
    padding: 8,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
  },
  bottomBarContent: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row-reverse',
    padding: 4,
  },
  bottomBarImage: {
    height: 18,
    marginLeft: 8,
  },
  root: {
    minHeight: 200,
    paddingBottom: 48,
    position: 'relative',
  },
  separator: {
    borderTop: '1px solid #efefef',
    marginBottom: 4,
  },
  wrapper: {
    width: '100%',
  },
});

export default styles;
