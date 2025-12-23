const styles = (theme) => ({
  '@keyframes sectionIn': {
    '0%': {
      opacity: 0,
      transform: 'translateX(50%)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateX(0)',
    },
  },
  '@keyframes sectionOut': {
    '0%': {
      opacity: 1,
      transform: 'translateX(0)',
    },
    '100%': {
      opacity: 0,
      transform: 'translateX(50%)',
    },
  },

  addTabs: {
    '& span': {
      '& svg': {
        marginBottom: 0,
        marginRight: 12,
      },
      flexDirection: 'row',
    },
  },
  animContainer: {
    '& [contenteditable][placeholder]:empty:before': {
      backgroundColor: 'transparent',
      color: 'gray',
      content: 'attr(placeholder)',
      // position: 'absolute',
      // width: '587px',
    },
    animation: `$sectionIn 1000ms ${theme.transitions.easing.easeInOut}`,
  },
  animOutContainer: {
    animation: `$sectionOut 1000ms ${theme.transitions.easing.easeInOut}`,
  },
  contentImage: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    marginRight: '5px',
  },
  contentImageLeft: {
    display: 'flex',
    flex: 1,
    justifyContent: 'start',
    marginLeft: '5px',
  },
  contentText: {
    flex: 2,
  },
  default: {
    alignItems: 'center',
    display: 'flex',
  },
  defaultWithMargin: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: '30px',
  },
  defaultWithTabs: {
    alignItems: 'center',
    paddingBottom: '16px',
  },
  descContent: {
    color: '#3B525C',
    fontSize: '16px',
    fontWeight: '300',
    letterSpacing: '0.0015em',
    lineHeight: '28px',
    margin: '1em 0',
  },
  descContentTop: {
    color: '#3B525C',
    fontSize: '20px',
    fontWeight: '300',
    letterSpacing: '0.0015em',
    lineHeight: '28px',
    maxWidth: '100%',
  },
  heading2: {
    color: '#111E24',
    cursor: 'pointer',
    fontSize: '24px',
    fontWeight: 'normal',
    lineHeight: '28px',
    // maxWidth: '700px',
  },
  locationclick: {
    color: theme.color.green.main,
    cursor: 'pointer',
    fontWeight: 500,
    textAlign: 'right',
  },
  mapbox: {
    '& svg': {
      color: '#B3C3CA',
      fontSize: 100,
      left: '50%',
      position: 'absolute',
      top: '50%',
      transform: 'translate(-50%,-50%)',
    },
    border: '2px dashed #B3C3CA',
    cursor: 'pointer',
    height: 450,
    position: 'relative',
    width: '100%',
  },
  popovercontent: {
    padding: 12,
    wordBreak: 'break-all',
  },
  section1: {
    flex: 1,
  },
  textAlert: {
    color: theme.color.primary.main,
  },
  titleContent: {
    fontSize: '34px',
    fontWeight: 500,
    letterSpacing: '0.0025em',
    lineHeight: '40px',
    margin: '0.67em 0',
    // maxWidth: '700px',
  },

  warn: {
    backgroundColor: theme.color.primary.soft,
    borderRadius: 30,
    color: theme.color.primary.main,
    padding: '6px 12px',
    textAlign: 'center',
    width: 250,
  },
});

export default styles;
