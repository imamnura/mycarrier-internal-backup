export const styles = {
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (style) => ({ ...style, color: '#9CA9AF' }),
  singleValue: (provided) => ({
    ...provided,
    color: '#3B525C',
  }),
  valueContainer: (provided) => ({
    ...provided,
    color: '#3B525C',
    maxWidth: 'calc(100% - 8px)',
    overflow: 'hidden',
    display: 'inline-block',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#3B525C',
  }),
  menu: (provided, state) => {
    return {
      ...provided,
      top: state.menuPosition === 'fixed' ? 8 : 50,
      left: 0,
      margin: 'auto',
      borderRadius: 8,
      minWidth: '100%',
      width: 'max-content',
      boxShadow: '0px 6px 9px rgba(46, 67, 77, 0.08)',
      zIndex: 3,
    };
  },
  option: (provided) => ({
    ...provided,
    '&:hover': {
      backgroundColor: '#FAF0F0',
      cursor: 'pointer',
    },
    paddingLeft: 16,
    backgroundColor: 'transparent',
    color: '#3B525C',
    display: 'flex',
    justifyContent: 'space-between',
  }),
  control: (provided, state) => {
    let bg = '';
    if (state.isFocused) bg = '#FAF0F0';
    if (state.isDisabled) bg = '#B3C3CA';
    return {
      ...provided,
      '&:hover': {
        backgroundColor: '#FAF0F0',
        cursor: 'pointer',
      },
      '&:focus': {
        backgroundColor: '#FAF0F0',
      },
      backgroundColor: bg,
      boxShadow: 'none',
      height: 40,
      border: 'none',
      borderRadius: 4,
      paddingLeft: 8,
      paddingRight: 8,
      color: '#3B525C',
    };
  },
};
export const stylesSearch = {
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (style) => ({ ...style, color: '#9CA9AF' }),
  singleValue: (provided) => ({
    ...provided,
    color: '#3B525C',
  }),
  menu: (provided, state) => {
    return {
      ...provided,
      top: state.menuPosition === 'fixed' ? 8 : 50,
      left: 0,
      margin: 'auto',
      borderRadius: 8,
      minWidth: '100%',
      boxShadow: '0px 6px 9px rgba(46, 67, 77, 0.08)',
      zIndex: 3,
    };
  },
  loadingIndicator: () => ({
    display: 'none',
  }),
  option: (provided) => ({
    ...provided,
    '&:hover': {
      backgroundColor: '#FAF0F0',
      cursor: 'pointer',
    },
    paddingLeft: 16,
    backgroundColor: 'transparent',
    color: '#3B525C',
    wordBreak: 'break-all',
    display: 'flex',
    justifyContent: 'space-between',
  }),
  control: (provided, state) => {
    let bg = '';
    if (state.isFocused) bg = '#FAF0F0';
    if (state.isDisabled) bg = '#B3C3CA';
    return {
      ...provided,
      '&:hover': {
        backgroundColor: '#FAF0F0',
        cursor: 'pointer',
      },
      '&:focus': {
        backgroundColor: '#FAF0F0',
      },
      backgroundColor: bg,
      boxShadow: 'none',
      paddingLeft: 8,
      paddingRight: 8,
      border: 'none',
      paddingTop: 0,
      borderRadius: 4,
      color: '#3B525C',
    };
  },
};
