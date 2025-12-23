const styles = () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: 16,
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
  flex: {
    display: 'flex',
    justifyContent: 'center',
  },
  legendBox: {
    background: 'red',
    borderRadius: 2,
    height: 16,
    margin: '0 8px 0 16px',
    width: 16,
  },
  rootLegend: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: 8,
  },
  title: {
    textAlign: 'center',
  },
});

export default styles;
