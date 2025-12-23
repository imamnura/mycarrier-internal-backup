import { getPurchaseOrderWorklog } from '../utils';

describe('src/containers/Document/PurchaseOrder/Detail-v2', () => {
  it('getPurchaseOrderWorklog', () => {
    expect(
      getPurchaseOrderWorklog([
        {
          step: 1,
          status: 'test',
          dateTime: '2022-09-06T16:12:46+07:00',
          createdBy: '',
        },
        {
          step: 1,
          status: 'On Progress',
          note: 'Request Non Bulk activation',
          dateTime: '2022-09-06T16:12:46+07:00',
          createdBy: '',
        },
        {
          step: 2,
          status: 'Completed',
          note: 'Non Bulk activation order completed',
          noteProgress: 'test',
          dateTime: '2023-01-18T08:35:30.063Z',
          createdBy: 'DENA HARDIANTO',
        },
      ]),
    ).toBeTruthy();
  });
});
