import useStyles from '../../List.styles';

describe('src/containers/ContentManagement/Homepage/List/hooks/useStyles', () => {
  test('style', () => {
    expect(useStyles()).not.toBeNull();
  });
});
