import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Component from '../Detail';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');
jest.mock('../utils');

const useActionReturn = {
  action: jest.fn(),
  modalAddLoginData: null,
  setModalAddLoginData: jest.fn(),
  customerAccountNumber: 'test123',
  loginDataId: 'tes123',
  loading: false,
  data: {
    loginDataId: 'LD-1633617223107',
    username: 'test',
    password: 'test',
    status: 'COMPLETED',
    note: 'gw mo akun login buat 10 user',
    progress: [
      {
        title: 'Submitted',
        variant: 'success',
        time: '2021-10-07T21:33:42+07:00',
      },
      {
        title: 'On Progress',
        variant: 'success',
        time: '2021-10-07T21:33:42+07:00',
      },
      {
        title: 'Completed',
        variant: 'success',
        time: '2023-01-30T11:30:03+07:00',
      },
    ],
    worklog: [
      {
        step: 0,
        status: 'Submitted',
        note: 'Your login data request has been successfully submitted.',
        dateTime: '2021-10-07T21:33:42+07:00',
      },
      {
        step: 1,
        status: 'On Progress',
        note: 'Your ticket is being processed.',
        dateTime: '2021-10-07T21:33:42+07:00',
      },
      {
        step: 2,
        status: 'Completed',
        note: 'Your login data has been successfully added.',
        dateTime: '2023-01-30T11:30:03+07:00',
      },
    ],
    customerAccountNumber: '0003700008',
    createdAt: '2021-10-07T21:33:42+07:00',
    lastUpdate: '2023-01-30T11:30:03+07:00',
    customerAccountName: '',
  },
};

const props = { feature: [] };

describe('src/containers/ServiceDelivery/ApprovalMRTG/LoginDataDetail', () => {
  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
