import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import useAction from '../hooks/useAction';
import PaymentHistorical from '../PaymentHistorical';
import useStyles from '../styles';

jest.mock('../hooks/useAction');
jest.mock('../styles');

const actions = {
  date: 'test',
  isNotToday: false,
  list: {
    data: {},
    meta: {
      files: {
        BNI: { fileUrl: 'test', fileNameOrigin: 'test' },
        Mandiri: { fileUrl: 'test', fileNameOrigin: 'test' },
      },
    },
  },
  loading: false,
  onBottomPage: jest.fn(),
  onClosePopUpListSubmit: jest.fn(),
  onUpload: jest.fn(),
  popUpListSubmit: {},
  setDate: jest.fn(),
};

describe('src/containers/BillsAndPayment/BillsAndPaymentManagement/Main/elements/Dashboard/elements/PaymentHistorical/index', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('11 August 2023 08:08:08 UTC'));
    useStyles.mockReturnValue({});
  });

  test('render', () => {
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PaymentHistorical />);
    expect(tree).toMatchSnapshot();
  });

  test('render fileNameOrigin undefined', () => {
    useAction.mockReturnValue({
      ...actions,
      list: {
        data: {},
        meta: {
          files: {
            BNI: { fileUrl: 'test' },
            Mandiri: { fileUrl: 'test' },
          },
        },
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PaymentHistorical />);
    expect(tree).toMatchSnapshot();
  });
});
