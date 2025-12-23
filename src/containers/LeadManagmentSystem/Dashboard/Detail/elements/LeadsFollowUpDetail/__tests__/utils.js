import { normalizeList } from '../utils';

describe('src/containers/LeadManagementSystem/Dashboard/Detail/elements/LeadFollowUpDetail/utils', () => {
  test('function', () => {
    expect(
      normalizeList([{}], 'attachments', {
        onEditFollowUp: jest.fn(),
        onDeleteFollowUp: jest.fn(),
        onPreviewDocument: jest.fn(),
      }),
    ).toBeTruthy();
  });
});
