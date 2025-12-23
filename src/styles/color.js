const color = {
  black: '#000000',
  blue: {
    main: '#3071D9',
    soft: '#CFE0FC',
  },
  general: {
    dark: '#111E24',
    light: '#B3C3CA',
    main: '#3B525C',
    mid: '#78858B',
    soft: '#E4E7E9',
    general: '#3B525C',
  },
  green: {
    main: '#3BA064',
    soft: '#ABEDC5',
    dark: '#0E9255',
  },
  grey: {
    main: '#9E9E9E',
    soft: '#F5F5F5',
  },
  orange: {
    main: '#FD7E14',
    soft: '#FFE8CC',
  },
  primary: {
    dark: '#900E0E',
    light: '#FAB7B7',
    main: '#DE1B1B',
    mid: '#F55151',
    soft: '#FAF0F0',
  },
  purple: {
    main: '#9657D6',
    soft: '#EBDBFA',
  },
  white: '#FFFFFF',
  yellow: {
    main: '#FAB005',
    soft: '#FFF3BF',
  },
  secondary: {
    25: '#F8F9FA',
    100: '#D2D8DA',
    300: '#87959B',
    400: '#61737C',
  },
  success: {
    50: '#E1F7EC',
    500: '#12B76A',
  },
};

export const colorMapper = (colorStr) => {
  const colorStrSplit = colorStr?.split('-') || [];

  if (colorStrSplit.length === 2) {
    return color[colorStrSplit[0]][colorStrSplit[1]] || 'inherit';
  } else if (colorStrSplit.length === 1) {
    return color[colorStrSplit[0]] || 'inherit';
  } else {
    return 'inherit';
  }
};

export default color;
