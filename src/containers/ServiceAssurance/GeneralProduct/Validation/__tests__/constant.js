import { handleStatus, breadcrumb } from '../constant';

describe('src/containers/ServiceAssurance/GeneralProduct/Validation/constant', () => {
  test('tableHeader', () => {
    expect(handleStatus('draft')).not.toBeNull();
    expect(handleStatus('')).not.toBeNull();
  });

  test('breadcrumb', () => {
    expect(breadcrumb('123')).not.toBeNull();
  });
});
