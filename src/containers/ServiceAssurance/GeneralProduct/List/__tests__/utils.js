import {
  schemaList,
  progressOptions,
  statusOptions,
  normalizeList,
} from '../utils';

jest.mock('../hooks/useActions');

describe('src/containers/ServiceAssurance/GeneralProduct/List/utils', () => {
  const actionMock = {
    setEvidenceFile: jest.fn(),
    setOpenPreview: jest.fn(),
  };

  const data = [
    {
      status: 'completed',
      fileEvidence: {
        fileName: '',
      },
      mttr: 1000,
    },
    {
      status: 'onprogress',
      fileEvidence: {
        fileName: '',
      },
      mttr: 1000,
    },
    {
      status: 'checking',
      fileEvidence: {
        fileName: '',
      },
    },
  ];

  test('progressOptions', () => {
    expect(progressOptions).not.toBeNull();
  });

  test('statusOptions', () => {
    expect(statusOptions).not.toBeNull();
  });

  test('schemaList', () => {
    expect(schemaList('approval')).not.toBeNull();
    expect(schemaList('history')).not.toBeNull();
  });

  test('normalizeList', () => {
    expect(normalizeList(data, 'approval', actionMock)).not.toBeNull();
    expect(normalizeList(data, 'history', actionMock)).not.toBeNull();
  });
});
