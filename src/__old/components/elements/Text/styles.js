const styles = (theme) => ({
  baseText: {
    fontFamily: 'Titillium Web',
  },
  body1: {
    fontSize: 16,
    letterSpacing: '0.005em',
  },
  body2: {
    fontSize: 14,
    letterSpacing: '0.0025em',
  },
  bold: {
    fontWeight: 'bold' + ' !important',
  },
  button: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  caption: {
    fontSize: 12,
    fontWeight: 'normal',
    letterSpacing: '0.004em',
  },
  captionBold: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: '0.004em',
  },
  colorblue: {
    color: theme.color.blue.main,
  },
  colordefault: {
    color: theme.color.general.main,
  },
  colorgreen: {
    color: theme.color.green.main,
  },
  colorgrey: {
    color: theme.color.general.mid,
  },
  colormainDark: {
    color: theme.color.general.dark,
  },
  colorprimary: {
    color: theme.color.primary.main,
  },
  colorsoftGrey: {
    color: theme.color.general.soft,
  },
  coloryellow: {
    color: theme.color.yellow.main,
  },
  colorwhite: {
    color: theme.color.white,
  },
  h1: {
    fontSize: 60,
    fontWeight: 300,
    letterSpacing: '-0.005em',
  },
  h2: {
    fontSize: 48,
  },
  h3: {
    fontSize: 34,
    letterSpacing: '0.0025em',
  },
  h4: {
    fontSize: 24,
  },
  h4Medium: {
    fontSize: 24,
    fontWeight: 500,
  },
  h5: {
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: '0.0015em',
  },
  inline: {
    display: 'block',
  },
  medium: {
    fontWeight: 500 + ' !important',
  },
  overline: {
    fontSize: 10,
    fontWeight: 'normal',
    letterSpacing: '0.015em',
  },
  overlineMedium: {
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: '0.015em',
  },
  regular: {
    fontWeight: 400 + ' !important',
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: '0.004em',
  },
  subtitle1: {
    fontSize: 16,
    letterSpacing: '0.0015em',
  },
  subtitle1Bold: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: '0.0015em',
  },
  subtitle2: {
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: '0.01em',
  },
});

export default styles;
