import { reOrder, ordinalDate, generateInitialData } from '../utils';

describe('src/containers/ContentManagement/Events/Add-v2/lib/components/Rundown/utils', () => {
  test('reOrder', () => {
    const data = [
      {
        title: 'tests',
        date: 'test',
        startTime: 'test',
        endTime: 'test',
        items: [
          {
            title: 'tests',
            date: 'test',
            startTime: 'test',
            endTime: 'test',
          },
        ],
      },
    ];
    const sourceIndex = 0;
    const destinationIndex = 1;
    const type = 'event';

    expect(reOrder({ data, sourceIndex, destinationIndex, type })).toBeTruthy();
    expect(
      reOrder({ data, sourceIndex, destinationIndex, type: 'day' }),
    ).toBeTruthy();
  });

  test('ordinalDate', () => {
    expect(ordinalDate(11, 'id')).toBeTruthy();
    expect(ordinalDate(5, 'id')).toBeTruthy();
    expect(ordinalDate(11, 'en')).toBeTruthy();
    expect(ordinalDate(5, 'en')).toBeTruthy();
  });

  test('generateInitialData', () => {
    const rangeDate = [
      '2023-03-08T00:00:00+07:00',
      '2023-03-10T00:00:00+07:00',
    ];
    expect(generateInitialData(rangeDate)).toBeTruthy();
  });
});
