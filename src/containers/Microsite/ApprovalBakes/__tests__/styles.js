import styles from '../styles';
import theme from '@styles/theme';

describe('src/pages/Microsite/ApprovalBakes/styles', () => {
  test('styles', () => {
    expect(styles(theme)).not.toBeNull();
  });
});
