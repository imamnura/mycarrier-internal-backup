const styles = (theme) => ({
  boxCompleted: {
    backgroundColor: theme.color.green.soft,
    border: `1px solid ${theme.color.green.main}`,
    borderRadius: 8,
    color: theme.color.green.main,
    margin: '12px 0px 24px',
    padding: 24,
    textAlign: 'center',
    width: '100%',
  },
  boxNPS: {
    '& span': {
      lineHeight: '48px',
      textAlign: 'center',
    },

    borderRadius: 8,
    height: 50,
    marginTop: 8,
    padding: '2px 2px',
    textAlign: 'center',
    width: 48,
  },
  boxNPSGreen: {
    backgroundColor: '#3BA064',
  },
  boxNPSRed: {
    backgroundColor: theme.color.primary.main,
  },
  boxNPSYellow: {
    backgroundColor: '#FAB005',
  },
  boxNPSYellow2: {
    backgroundColor: '#FAB005',
  },
  circleNumber: {
    '& span': {
      lineHeight: '40px',
    },
    background: theme.color.primary.main,
    borderRadius: '100%',
    height: 40,
    marginTop: 12,
    textAlign: 'center',
    width: 40,
  },
  dialogWidth: {
    maxWidth: 432,
  },
  evidenceWrapper: {
    paddingLeft: `24px !important`,
  },
  msisdnWrapper: {
    paddingLeft: `24px !important`,
  },
  wrapper: {
    paddingTop: `32px !important`,
  },
});

export default styles;
