const styles = (theme) => ({
  bold: {
    fontWeight: 'bold',
  },
  checkIcon: {
    marginTop: '0.3rem',
  },
  circleNumber: {
    '& span': {
      lineHeight: '30px',
    },
    background: theme.color.primary.main,
    borderRadius: '100%',
    height: 30,
    marginTop: 12,
    textAlign: 'center',
    width: 30,
  },
});

export default styles;
