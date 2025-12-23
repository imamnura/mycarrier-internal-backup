import { isEmptyItemsRundown } from '../utils';

describe('src/containers/ContentManagement/Events/Add-v2/utils', () => {
  test('isEmptyItemsRundown', () => {
    const arr = [
      {
        items: [
          {
            enTime: '09.00',
            title: 'test',
          },
          {
            enTime: '09.00',
            title: 'test',
          },
        ],
      },
    ];

    const titleEmpty = [{ items: [{ title: '' }] }];

    const itemsEmpty = [{ items: [] }];

    expect(isEmptyItemsRundown(titleEmpty)).toBeTruthy();
    expect(isEmptyItemsRundown(itemsEmpty)).toBeTruthy();
    expect(isEmptyItemsRundown(arr)).toBeFalsy();
  });
});
