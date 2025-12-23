import styles from '../styles';
import theme from '@styles/theme';

describe('src/pages/Microsite/lib/Content/styles', () => {
  test('styles', () => {
    expect(styles(theme)).not.toBeNull();
  });
});
