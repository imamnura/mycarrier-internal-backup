import { imageStatus } from '../constants';

describe('src/pages/Microsite/ApprovalBakes/constant', () => {
  test('imageStatus', () => {
    expect(imageStatus('status')).not.toBeNull();
    expect(imageStatus('approved')).not.toBeNull();
    expect(imageStatus('rejected')).not.toBeNull();
    expect(imageStatus('returned')).not.toBeNull();
  });
});
