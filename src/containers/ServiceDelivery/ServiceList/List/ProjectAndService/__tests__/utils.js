import { checkProduct } from '../utils';

describe('src/containers/ServiceDelivery/ProductList/List/utils', () => {
  test('checkProduct', () => {
    expect(checkProduct('Akses Jasa Call Center')).not.toBeUndefined();
    expect(checkProduct('Layanan Masking Number')).not.toBeUndefined();
    expect(checkProduct('ITKP')).not.toBeUndefined();
    expect(checkProduct('Calling Card')).not.toBeUndefined();
    expect(checkProduct('')).not.toBeUndefined();
  });
});
