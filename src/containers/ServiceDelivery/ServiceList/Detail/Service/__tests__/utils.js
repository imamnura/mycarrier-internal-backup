import { route } from '@configs';
import {
  handleStatus,
  breadcrumb,
  maskServiceStatus,
  getServiceWorklog,
} from '../utils';

describe('src/containers/ServiceDelivery/ServiceList/Detail/utils', () => {
  it('breadcrumb', () => {
    expect(breadcrumb('123', '123', '123')).toEqual([
      { label: 'Service List', url: route.serviceList('list') },
      {
        label: '123',
        url: `${route.serviceList('detailCustomer', '123')}?tab=serviceList`,
      },
      { label: '123', url: route.serviceList('detailProject', '123', '123') },
      { label: '123' },
    ]);
    expect(breadcrumb('123', '123')).toEqual([
      { label: 'Service List', url: route.serviceList('list') },
      {
        label: '123',
        url: `${route.serviceList('detailCustomer', '123')}?tab=serviceList`,
      },
      { label: '123' },
    ]);
  });
  it('handleStatus', () => {
    expect(handleStatus('Active')).toEqual({
      children: 'Active',
      variant: 'success',
    });
  });
  it('maskServiceStatus', () => {
    expect(maskServiceStatus('need_validation')).toEqual('Need Validation');
    expect(maskServiceStatus('Status Not Recognized')).toEqual(
      'Status Not Recognized',
    );
  });
  it('getServiceWorklog', () => {
    expect(
      getServiceWorklog([
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
