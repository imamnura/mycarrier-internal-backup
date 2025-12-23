import styles from '../styles';
import theme from '../../../../../styles/theme';

describe('src/components/form/AddAMMappingCustomer/styles', () => {
  it('test styles', () => {
    expect(styles(theme)).not.toBeNull();
  });
});
