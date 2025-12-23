import useStyles from '../useStyles';

describe('src/containers/ContentManagement/Article/List/hooks/useStyles', () => {
  test('style', () => {
    expect(useStyles()).not.toBeNull();
  });
});
