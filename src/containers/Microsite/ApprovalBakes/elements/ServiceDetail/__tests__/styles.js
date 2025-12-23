import styles from '../styles';
import theme from '@styles/theme';

describe('src/pages/Microsite/ApprovalBakes/element/PreviewDocMicrosite/styles', () => {
  test('styles', () => {
    expect(styles(theme)).not.toBeNull();
  });
});
