import color from '../../styles/color';

const useStyles = ({
  additionalWidth,
  maxWidth,
  menuStick: _menuStick,
  menuWidth,
  minWidth,
  overrideStyles,
  staticWidth,
  noBorder,
  variant,
  valueFitToContent,
  staticHeight,
}) => {
  const menuStick = _menuStick === 'left' ? { left: 0 } : { right: 0 };

  const container = (provided) => ({
    ...provided,
    width: '100%',
  });

  const menuPortal = (provided) => ({
    ...provided,
    zIndex: 1001,
  });

  const indicatorSeparator = (provided, state) => ({
    ...provided,
    backgroundColor: color.general.light,
    display: state.isMulti && state.hasValue ? 'block' : 'none',
    margin: '12px 8px',
  });

  const placeholder = () => ({
    alignItems: 'center',
    display: 'inline-block',
    flexWrap: 'wrap',
    padding: 0,
    paddingRight: 8,
    position: 'relative',
    ...overrideStyles?.placeholder,
  });

  const singleValue = (provided, state) => ({
    ...provided,
    color: state.isDisabled
      ? color.general.light
      : variant == 'ghost'
      ? color.primary.main
      : color.general.main,
    // width: '100%',
    width: valueFitToContent ? 'fit-content' : '100%',
    paddingRight: 8,
  });

  const valueContainer = (provided, state) => {
    if (state.hasValue) {
      return {
        ...provided,
        padding: 0,
        paddingRight: 8,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        flexWrap: 'nowrap',
      };
    }

    return {
      ...provided,
      display: 'inline-block',
      overflow: 'hidden',
      padding: 0,
      paddingRight: 8,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    };
  };

  const indicator = (provided, state) => ({
    '& .arrow': {
      height: 16,
      transform: state.selectProps.menuIsOpen ? 'rotate(-180deg)' : 'rotate(0)',
      transition: '200ms',
      width: 16,
    },
    '& .cancel': {
      '&:hover': {
        color: color.general.mid,
      },
      display: state.isMulti && state.hasValue ? 'block' : 'none',
      height: 16,
      transition: '200ms',
      width: 16,
    },
    alignItems: 'center',
    display: 'flex',
  });

  const menu = (provided) => ({
    ...provided,
    ...menuStick,
    borderRadius: 8,
    boxShadow: '0px 6px 9px rgba(46, 67, 77, 0.08)',
    maxWidth: '100%',
    padding: '4px 0',
    minWidth: menuWidth || staticWidth || minWidth || 200,
    width: menuWidth || staticWidth || minWidth || 200,
    zIndex: 3,
  });

  const menuList = (provided) => ({
    ...provided,
    ...(staticHeight && {
      height: staticHeight,
      maxHeight: staticHeight,
    }),
  });

  const option = (provided, state) => ({
    ...provided,
    '& .check': {
      display: state.isSelected && state.isMulti ? 'inline' : 'none',
      height: 16,
      width: 16,
    },
    '&:hover': {
      backgroundColor: color.primary.soft,
    },
    backgroundColor:
      state.isSelected && !state.isMulti ? color.primary.soft : color.white,
    color: color.general.main,
    cursor: 'pointer',
    display: 'flex',
    fontSize: 14,
    justifyContent: 'space-between',
    letterSpacing: '0.0025em',
    lineHeight: '16px',
    minHeight: 32,
    padding: '8px 16px',
    wordBreak: 'break-word',
  });

  const control = (provided, state) => {
    let width = 'auto';
    const value = state.getValue();
    const isSearchable = state.selectProps.isSearchable;
    const isLoading = state.selectProps.isLoading;

    if (!state.hasValue) {
      const placeholder = state.selectProps.placeholder || '';
      width = placeholder.length * (8 + additionalWidth) + 90;
    } else if (state.isMulti) {
      if (value.length > 1) {
        const strLength = value.length.toString().length;
        width = 224 + strLength * (8 + additionalWidth);
      } else {
        const singleVal = value[0]?.label || '';
        width = singleVal.length * (8 + additionalWidth) + 100;
      }
    } else {
      const singleVal = value[0]?.label || '';
      width = singleVal.length * (8 + additionalWidth) + 80;
    }

    if (isSearchable) {
      width = width + 16;
    }

    if (isLoading) {
      width = width + 28;
    }

    if (value[0]?.customOption?.type === 'status' && state.hasValue) {
      width = width + 120;
    }

    if (
      state.selectProps?.options[0]?.customOption?.type === 'phone' &&
      state.selectProps.inputValue.length === 0
    ) {
      width = 90;
    }

    const textStyles = {
      fontSize: 16,
      letterSpacing: '0.005em',
      lineHeight: '19px',
    };

    return {
      ...provided,
      ...textStyles,
      '&:focus': {
        backgroundColor: color.primary.soft,
      },
      '&:hover': {
        backgroundColor: color.primary.soft,
      },
      // backgroundColor: state.isFocused ? color.primary.soft : '',
      backgroundColor: state.isDisabled
        ? '#d9dde3'
        : state.isFocused
        ? color.primary.soft
        : '',
      border: noBorder
        ? 'none'
        : variant == 'ghost'
        ? `1px solid ${color.primary.main}`
        : `1px solid #B1B5BA`,
      borderRadius: 4,
      boxShadow: 'none',
      color: state.isDisabled
        ? '#8C8F93'
        : variant == 'ghost'
        ? color.primary.main
        : color.general.main,
      cursor: 'pointer',
      height: 43,
      maxWidth: maxWidth || staticWidth || 200,
      padding: '0 16px',
      transition: `width 300ms, background 200ms`,
      width: staticWidth || width,
      minWidth: minWidth || 'none',
      ...overrideStyles?.control,
    };
  };

  return {
    clearIndicator: indicator,
    container,
    control,
    dropdownIndicator: indicator,
    indicatorSeparator,
    menu,
    option,
    placeholder,
    singleValue,
    valueContainer,
    menuPortal,
    menuList,
  };
};

export default useStyles;
