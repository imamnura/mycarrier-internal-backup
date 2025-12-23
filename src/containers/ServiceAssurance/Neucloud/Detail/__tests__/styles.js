import styles from '../styles';
import theme from '@styles/theme';

describe('src/containers/ServiceAssurance/Neucloud/Detail/styles', () => {
  it('test styles', () => {
    expect(styles(theme)).not.toBeNull();
  });
});
