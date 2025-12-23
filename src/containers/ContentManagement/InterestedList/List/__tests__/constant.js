import {
  tableHeader,
  optionsStatus,
  status,
  optionsStatusByStarclick,
} from '../constant';

describe('src/pages/ContentManagement/InterestedList/constant', () => {
  test('tableHeader', () => {
    expect(tableHeader(false)).not.toBeNull();
    expect(tableHeader(true)).toBeTruthy();
  });

  test('optionsStatus', () => {
    expect(optionsStatus).not.toBeNull();
  });

  test('optionsStatusByStarclick', () => {
    expect(optionsStatusByStarclick).not.toBeNull();
  });

  test('status', () => {
    const fnStatusParamseEmpty = status({
      label: '',
      variant: '',
    });
    const fnStatusParams = status('Waiting');

    expect(fnStatusParamseEmpty.label).not.toBeNull();
    expect(fnStatusParamseEmpty.variant).not.toBeNull();
    expect(fnStatusParams.label).not.toBeNull();
    expect(fnStatusParams.variant).not.toBeNull();
  });
});
