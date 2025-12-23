import styles from '../styles';
import theme from '@styles/theme';

describe('src/pages/BillsAndPayment/InvoiceDetail/styles', () => {
  test('styles', () => {
    expect(styles(theme)).not.toBeNull();
  });
});
