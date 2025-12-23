import styles from '../styles';
import theme from '@styles/theme';

describe('src/pages/ContentManagement/InterestedList/Detail/styles', () => {
  it('test styles', () => {
    expect(styles(theme)).not.toBeNull();
  });
});
