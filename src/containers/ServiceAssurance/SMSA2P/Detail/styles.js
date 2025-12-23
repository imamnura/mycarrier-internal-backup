const styles = (theme) => ({
  boxCompleted: {
    backgroundColor: theme.color.green.soft,
    border: `1px solid ${theme.color.green.main}`,
    borderRadius: 8,
    color: theme.color.green.main,
    margin: '0 0px 24px',
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
    height: 'fit-content',
    marginTop: 8,
    marginRight: 16,
    padding: '0 16px',
    textAlign: 'center',
    width: 'fit-content',
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
      lineHeight: '30px',
    },
    background: theme.color.primary.main,
    borderRadius: '100%',
    height: 30,
    textAlign: 'center',
    width: 30,
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
