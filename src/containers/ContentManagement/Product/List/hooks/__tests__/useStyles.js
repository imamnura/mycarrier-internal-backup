import useStyles from '../useStyles';

describe('src/containers/ContentManagement/Product/List/hooks/useStyles', () => {
  test('style', () => {
    expect(useStyles()).not.toBeNull();
  });
});
