const section = {
  '& p': {
    fontSize: 16,
    fontWeight: 500,
  },
  '& svg': {
    fontSize: 30,
  },
  alignItems: 'center',
  border: `1px solid #B3C3CA`,
  borderRadius: 16,
  cursor: 'pointer',
  display: 'flex',
  margin: '0 25px 16px 25px',
  padding: '10px 20px',
};

const buttonDots = {
  '& svg': {
    marginRight: 5,
  },
  alignItems: 'center',
  cursor: 'pointer',
  display: 'flex',
  fontWeight: 500,
};

const styles = (theme) => ({
  addButton: {
    ...buttonDots,
    '& svg': {
      marginLeft: 18,
      marginRight: 5,
    },
    color: theme.color.green.main,
  },
  alert: {
    backgroundColor: theme.color.primary.light,
    borderRadius: 16,
    padding: 16,
    textAlign: 'center',
    width: '100%',
  },
  buttonContainer: {
    '& button': {
      margin: '0 6px',
    },
    display: 'flex',
    justifyContent: 'center',
    marginTop: '24px',
  },
  buttonSection: {
    '& p': {
      fontSize: 14,
      letterSpacing: '0.01em',
      marginLeft: '5px',
    },
    alignItems: 'center',
    display: 'flex',
    fontWeight: 'bold',
    width: 250,
  },
  buttonWrapper: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    margin: '16px 0',
  },
  chooseSection: {
    width: 432,
  },
  deleteButton: {
    ...buttonDots,
    color: theme.color.primary.main,
  },
  dots: {
    backgroundColor: '#D2DADE',
    borderRadius: '16px',
    cursor: 'pointer',
    height: '16px',
    marginLeft: '12px',
    width: '16px',
  },
  dotsActive: {
    backgroundColor: '#DE1B1B',
    borderRadius: '16px',
    height: '16px',
    marginLeft: '12px',
    width: '24px',
  },
  dotsContainer: {
    alignItems: 'center',
    display: 'flex',
    marginTop: '15px',
  },
  dotsContainerMiddle: {
    alignItems: 'center',
    display: 'flex',
    marginLeft: '335px',
    marginTop: '15px',
  },
  line: {
    marginRight: '10px',
    width: '100%',
  },
  sectionItem: {
    ...section,
    '&:hover': {
      backgroundColor: theme.color.primary.soft,
    },
  },
  sectionItemActive: {
    ...section,
    backgroundColor: theme.color.primary.soft,
  },
  sliderContent: {
    height: '300px',
  },
  youtube: {
    borderRadius: '4px',
    height: '200px',
    width: '300px',
  },
});

export default styles;
