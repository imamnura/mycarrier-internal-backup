import {
  detailSchema,
  // neucloudWorklog,
  dataMapping,
  getSuccessMessageNeucloud,
} from '../utils';

describe('src/containers/ServiceAssurance/DigitalProduct/Detail/utils', () => {
  const data = {
    product: 'antares',
    referenceId: 'test',
    ticketId: 'test',
    productName: 'test',
    createdAt: '2023-03-15T10:40:41.019Z',
    ttr: 'test',
    troubleType: 'test',
    subTroubleType: 'test',
    deviceType: 'test',
    browserVersion: 'test',
    troubleDesc: 'test',
    networkType: 'nonNetwork',
    sfCategory: 'test',
    sfSubCategory: 'test',
    evidenceFiles: {},
    worklog: [
      {
        step: 0,
        status: 'Checking',
        dateTime: '2023-03-15T10:41:34.171Z',
        note: 'Create Gameqoo Ticket',
        noteProgress: '',
        createdBy: 'DENA HARDIANTO',
      },
      {
        step: 1,
        status: 'On Progress',
        dateTime: '2023-03-15T10:47:24.938Z',
        note: '[Worklog From FAB Digital]',
        noteProgress: 'okee closed',
        createdBy: 'FAB',
        file: {
          fileUrl:
            'https://storage-assurance-dev.mytens.id/tdscustomerpublic/evidence-ticket-gameqoo/REFID-1678876841018/onprogress - oke-closed.jpg',
          fileName: 'oke-closed.jpg',
          fileType: 'jpg',
        },
      },
      {
        step: 2,
        status: 'On Hold',
        dateTime: '2023-03-15T10:46:56.095Z',
        note: '[Worklog From FAB Digital]',
        noteProgress: 'okee closed',
        createdBy: 'FAB',
        file: {
          fileUrl:
            'https://storage-assurance-dev.mytens.id/tdscustomerpublic/evidence-ticket-gameqoo/REFID-1678876841018/onhold - oke-closed.jpg',
          fileName: 'oke-closed.jpg',
          fileType: 'jpg',
        },
      },
      {
        step: 3,
        status: 'Solved',
        dateTime: '2023-03-15T10:50:09.158Z',
        note: '[Worklog From FAB Digital]',
        noteProgress: 'okee closed',
        createdBy: 'FAB',
        file: {
          fileUrl:
            'https://storage-assurance-dev.mytens.id/tdscustomerpublic/evidence-ticket-gameqoo/REFID-1678876841018/solved - oke-closed.jpg',
          fileName: 'oke-closed.jpg',
          fileType: 'jpg',
        },
      },
      {
        step: 4,
        status: 'closed',
        dateTime: null,
        note: '',
        noteProgress: '',
        createdBy: null,
      },
    ],
    historyWorklog: [
      {
        step: 0,
        status: 'CHECKING',
        dateTime: '2023-03-15T10:40:41.019Z',
        note: 'Create Antares Ticket',
        noteProgress: '',
        createdBy: null,
      },
      {
        step: 1,
        status: 'ON PROGRESS',
        dateTime: '2023-03-15T10:41:34.171Z',
        note: 'OCC Telkom is checking report ticket',
        noteProgress: '',
        createdBy: 'DENA HARDIANTO',
      },
      {
        step: 2,
        status: 'ON HOLD',
        dateTime: '2023-03-15T10:46:57.486Z',
        noteProgress: 'okee closed',
        note: '[Worklog From FAB Digital]',
        file: {
          fileUrl:
            'https://storage-assurance-dev.mytens.id/tdscustomerpublic/evidence-ticket-gameqoo/REFID-1678876841018/onhold - oke-closed.jpg',
          fileName: 'oke-closed.jpg',
          fileType: 'jpg',
        },
        createdBy: 'FAB',
      },
      {
        step: 3,
        status: 'ON PROGRESS',
        dateTime: '2023-03-15T10:47:26.226Z',
        noteProgress: 'okee closed',
        note: '[Worklog From FAB Digital]',
        file: {
          fileUrl:
            'https://storage-assurance-dev.mytens.id/tdscustomerpublic/evidence-ticket-gameqoo/REFID-1678876841018/onprogress - oke-closed.jpg',
          fileName: 'oke-closed.jpg',
          fileType: 'jpg',
        },
        createdBy: 'FAB',
      },
      {
        step: 4,
        status: 'SOLVED',
        dateTime: '2023-03-15T10:50:10.526Z',
        noteProgress: 'okee closed',
        note: '[Worklog From FAB Digital]',
        file: {
          fileUrl:
            'https://storage-assurance-dev.mytens.id/tdscustomerpublic/evidence-ticket-gameqoo/REFID-1678876841018/solved - oke-closed.jpg',
          fileName: 'oke-closed.jpg',
          fileType: 'jpg',
        },
        createdBy: 'FAB',
      },
    ],
  };

  const other = {
    onPreviewWorklog: jest.fn(),
  };

  const worklogRejected = {
    ...data,
    status: 'REPORT REJECTED',
    worklog: [
      {
        step: 0,
        status: 'Checking',
        dateTime: null,
        note: 'Create Gameqoo Ticket',
        noteProgress: '',
        createdBy: '',
      },
      {
        step: 5,
        status: 'Report Rejected',
        dateTime: '2023-03-29T03:29:56.814Z',
        note: 'OCC Telkom has been rejected ticket',
        noteProgress: 'ini reject',
        createdBy: 'DENA HARDIANTO',
      },
      {
        step: 1,
        status: 'On Progress',
        dateTime: null,
        note: '',
        noteProgress: '',
        createdBy: '',
      },
      {
        step: 2,
        status: 'On Hold',
        dateTime: null,
        note: '',
        noteProgress: '',
        createdBy: '',
      },
      {
        step: 3,
        status: 'Solved',
        dateTime: null,
        note: '',
        noteProgress: '',
        createdBy: '',
      },
      {
        step: 4,
        status: 'closed',
        dateTime: null,
        note: '',
        noteProgress: '',
        createdBy: null,
      },
    ],
    historyWorklog: [
      {
        step: 0,
        status: 'CHECKING',
        dateTime: '2023-03-29T03:24:37.624Z',
        note: 'Create Gameqoo Ticket',
        noteProgress: '',
        createdBy: 'User View MRTG',
      },
      {
        step: 1,
        status: 'REPORT REJECTED',
        dateTime: '2023-03-29T03:29:56.814Z',
        note: 'OCC Telkom has been rejected ticket',
        noteProgress: 'ini reject',
        createdBy: 'DENA HARDIANTO',
      },
    ],
  };

  const worklogFirst = {
    ...data,
    worklog: [
      {
        step: 0,
        status: 'Checking',
        dateTime: '',
        note: '',
        noteProgress: 'Create Gameqoo Ticket',
        createdBy: 'DENA HARDIANTO',
        description: 'test',
      },
      {
        step: 1,
        status: '',
        dateTime: '',
        note: '',
        noteProgress: '',
        createdBy: '',
      },
      {
        step: 2,
        status: '',
        dateTime: '',
        note: '',
        noteProgress: '',
        createdBy: '',
      },
    ],
    historyWorklog: [
      {
        step: 0,
        status: 'CHECKING',
        dateTime: '',
        note: '',
        noteProgress: '',
        createdBy: '',
      },
      {
        step: 1,
        status: 'REPORT REJECTED',
        dateTime: '',
        note: '',
        noteProgress: '',
        createdBy: '',
      },
    ],
  };

  test('detailSchema antares null', () =>
    expect(detailSchema(null)).not.toBeNull());
  test('detailSchema antares not null', () =>
    expect(detailSchema(data, other)).not.toBeNull());
  test('detailSchema antares stepper active 0', () =>
    expect(detailSchema(worklogFirst, other)).not.toBeNull());
  test('detailSchema antares rejected', () =>
    expect(detailSchema(worklogRejected, other)).not.toBeNull());

  test('detailSchema gameqoo nonNetwork', () => {
    expect(detailSchema({ ...data, product: 'gameqoo' }, other)).not.toBeNull();
  });
  test('detailSchema gameqoo REPORT CHECKING', () => {
    expect(
      detailSchema(
        {
          ...data,
          product: 'gameqoo',
          status: 'REPORT CHECKING',
          networkType: 'network',
        },
        other,
      ),
    ).not.toBeNull();
  });
  test('detailSchema gameqoo IN PROGRESS', () => {
    expect(
      detailSchema(
        {
          ...data,
          product: 'gameqoo',
          status: 'IN PROGRESS',
          networkType: 'network',
        },
        other,
      ),
    ).not.toBeNull();
  });
  test('detailSchema gameqoo ON PROGRESS', () => {
    expect(
      detailSchema(
        {
          ...data,
          product: 'gameqoo',
          status: 'ON PROGRESS',
          networkType: 'network',
        },
        other,
      ),
    ).not.toBeNull();
  });
  test('detailSchema gameqoo ON HOLD', () => {
    expect(
      detailSchema(
        {
          ...data,
          product: 'gameqoo',
          status: 'ON HOLD',
          networkType: 'network',
        },
        other,
      ),
    ).not.toBeNull();
  });
  test('detailSchema gameqoo SOLVED', () => {
    expect(
      detailSchema(
        {
          ...data,
          product: 'gameqoo',
          status: 'SOLVED',
          networkType: 'network',
        },
        other,
      ),
    ).not.toBeNull();
  });
  test('detailSchema gameqoo CLOSED', () => {
    expect(
      detailSchema(
        {
          ...data,
          product: 'gameqoo',
          status: 'CLOSED',
          networkType: 'network',
        },
        other,
      ),
    ).not.toBeNull();
  });
  test('detailSchema gameqoo REPORT ISSUED', () => {
    expect(
      detailSchema(
        {
          ...data,
          product: 'gameqoo',
          status: 'REPORT ISSUED',
          networkType: 'network',
        },
        other,
      ),
    ).not.toBeNull();
  });
  test('detailSchema gameqoo FAULT ANALYSIS', () => {
    expect(
      detailSchema(
        {
          ...data,
          product: 'gameqoo',
          status: 'FAULT ANALYSIS',
          networkType: 'network',
        },
        other,
      ),
    ).not.toBeNull();
  });
  test('detailSchema gameqoo FAULT HANDLING', () => {
    expect(
      detailSchema(
        {
          ...data,
          product: 'gameqoo',
          status: 'FAULT HANDLING',
          networkType: 'network',
        },
        other,
      ),
    ).not.toBeNull();
  });
  test('detailSchema gameqoo FAULT COMPLETION', () => {
    expect(
      detailSchema(
        {
          ...data,
          product: 'gameqoo',
          status: 'FAULT COMPLETION',
          networkType: 'network',
        },
        other,
      ),
    ).not.toBeNull();
  });
  test('detailSchema gameqoo REPORT COMPLETED', () => {
    expect(
      detailSchema(
        {
          ...data,
          product: 'gameqoo',
          status: 'REPORT COMPLETED',
          networkType: 'network',
        },
        other,
      ),
    ).not.toBeNull();
  });
  test('detailSchema gameqoo REPORT REJECTED', () => {
    expect(
      detailSchema(
        {
          ...data,
          product: 'gameqoo',
          status: 'REPORT REJECTED',
          networkType: 'network',
        },
        other,
      ),
    ).not.toBeNull();
  });

  test('detailSchema neucloud CHECKING', () => {
    expect(
      detailSchema({ ...data, product: 'neucloud', status: 'CHECKING' }, other),
    ).not.toBeNull();
  });
  test('detailSchema neucloud ON PROGRESS', () => {
    expect(
      detailSchema(
        { ...data, product: 'neucloud', status: 'ON PROGRESS' },
        other,
      ),
    ).not.toBeNull();
  });
  test('detailSchema neucloud CLOSED', () => {
    expect(
      detailSchema({ ...data, product: 'neucloud', status: 'CLOSED' }, other),
    ).not.toBeNull();
  });
  test('detailSchema neucloud REPORT REJECTED', () => {
    expect(
      detailSchema(
        { ...data, product: 'neucloud', status: 'REPORT REJECTED' },
        other,
      ),
    ).not.toBeNull();
  });

  // test('generateWorklogNote', () => {
  //   expect(
  //     neucloudWorklog({ ...data, status: 'REPORT REJECTED' }, other),
  //   ).not.toBeNull();
  // });

  test('dataMapping null', () => {
    expect(dataMapping(null)).toBeFalsy();
  });
  test('dataMapping gameqoo network', () => {
    expect(
      dataMapping(
        { ...data, product: 'gameqoo', networkType: 'network', score: '100' },
        other,
      ),
    ).not.toBeNull();
  });
  test('dataMapping gameqoo nonNetwork', () => {
    expect(
      dataMapping(
        { ...data, product: 'gameqoo', networkType: 'nonNetwork' },
        other,
      ),
    ).not.toBeNull();
  });
  test('dataMapping antares', () => {
    expect(
      dataMapping(
        { ...data, product: 'antares', status: 'REPORT REJECTED' },
        other,
      ),
    ).not.toBeNull();
  });
  test('dataMapping neucloud', () => {
    expect(
      dataMapping(
        { ...data, product: 'neucloud', status: 'REPORT REJECTED' },
        other,
      ),
    ).not.toBeNull();
  });

  test('getSuccessMessageNeucloud Add', () => {
    expect(getSuccessMessageNeucloud('Add')).not.toBeNull();
  });
  test('getSuccessMessageNeucloud Edit', () => {
    expect(getSuccessMessageNeucloud('Edit')).not.toBeNull();
  });
  test('getSuccessMessageNeucloud UpdateStatus', () => {
    expect(getSuccessMessageNeucloud('UpdateStatus')).not.toBeNull();
  });
});
