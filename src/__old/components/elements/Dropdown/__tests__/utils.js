import { styles, stylesSearch } from '../utils';

const paramsCloud = {
  provided: {},
  stateMenuFixed: {
    menuPosition: 'fixed',
  },
  stateMenu: {
    menuPosition: 'relative',
  },
  stateControlTrue: {
    isFocused: true,
  },
  stateControlDisable: {
    isDisabled: true,
  },
  stateControlFalse: {
    isFocused: false,
  },
};

describe('src/components/elements/Dropdown/utils', () => {
  test('utils styles functions', () => {
    expect(styles.dropdownIndicator()).not.toBeNull();
    expect(styles.singleValue()).not.toBeNull();
    expect(
      styles.menu(paramsCloud.provided, paramsCloud.stateMenu),
    ).not.toBeNull();
    expect(
      styles.menu(paramsCloud.provided, paramsCloud.stateMenuFixed),
    ).not.toBeNull();
    expect(styles.option()).not.toBeNull();
    expect(
      styles.control(paramsCloud.provided, paramsCloud.stateControlTrue),
    ).not.toBeNull();
    expect(
      styles.control(paramsCloud.provided, paramsCloud.stateControlDisable),
    ).not.toBeNull();
    expect(
      styles.control(paramsCloud.provided, paramsCloud.stateControlFalse),
    ).not.toBeNull();
  });

  test('utils stylesSearch functions', () => {
    expect(stylesSearch.indicatorSeparator()).not.toBeNull();
    expect(stylesSearch.dropdownIndicator()).not.toBeNull();
    expect(stylesSearch.singleValue()).not.toBeNull();
    expect(
      stylesSearch.menu(paramsCloud.provided, paramsCloud.stateMenu),
    ).not.toBeNull();
    expect(
      stylesSearch.menu(paramsCloud.provided, paramsCloud.stateMenuFixed),
    ).not.toBeNull();
    expect(stylesSearch.loadingIndicator()).not.toBeNull();
    expect(stylesSearch.option()).not.toBeNull();
    expect(
      stylesSearch.control(paramsCloud.provided, paramsCloud.stateControlTrue),
    ).not.toBeNull();
    expect(
      stylesSearch.control(paramsCloud.provided, paramsCloud.stateControlFalse),
    ).not.toBeNull();
  });
});
