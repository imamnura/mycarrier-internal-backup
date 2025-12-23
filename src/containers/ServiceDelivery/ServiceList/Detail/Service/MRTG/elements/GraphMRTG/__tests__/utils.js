import { normalizeLine } from '../utils';

const data = [
  {
    averageIn: 1000,
    averageOut: 2000,
    data: [
      {
        data: [
          {
            y: 2000,
          },
        ],
      },
    ],
  },
];

describe('src/containers/ServiceDelivery/ServiceList/Detail/MRTG/elements/GraphMRTG/utils', () => {
  test('normalizeLine', () => {
    expect(normalizeLine(data)).not.toBeUndefined();
    expect(normalizeLine([])).not.toBeUndefined();
  });
});
