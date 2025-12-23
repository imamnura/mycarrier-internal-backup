import { imageStatus } from '../constants';

describe('src/containers/Microsite/ApprovalVisitNeucentrix/constants', () => {
  it('imageStatus', () => {
    expect(imageStatus('rejected')).toBeDefined();
    expect(imageStatus('')).toBeDefined();
  });
});
