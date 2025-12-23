import { detailSchema, getLBAStepper, getLBAWorklog } from '../utils';

jest.mock('@utils/common');

const status = [
  'checking',
  'onprogress',
  'customer request',
  'completed',
  'rejected',
  'rate us',
];

const data = {
  activationStatus: 'checking',
  worklog: [],
};

describe('src/containers/SMSA2P/LBA', () => {
  test('detailSchema', () => {
    expect(detailSchema(data)).not.toBeNull();
  });

  test('getLBAStepper', () => {
    status.map((v) => {
      expect(getLBAStepper(v)).not.toBeNull();
    });
  });

  test('getLBAWorklog', () => {
    expect(getLBAWorklog([{}])).not.toBeNull();
    expect(getLBAWorklog([{ note: 'test' }])).not.toBeNull();
    expect(getLBAWorklog([{ noteProgress: 'test' }])).not.toBeNull();
  });
});
