import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Detail from '../Detail';
import useActions from '../hooks/useActions';
import { priviledge, getGPWorklog } from '../utils';

jest.mock('../hooks/useActions');

describe('src/containers/ServiceAssurance/GeneralProduct/Detail', () => {
  const returnValueData = {
    referenceId: '123',
    fetchDetail: jest.fn(),
    data: null,
    loading: false,
    modalReturn: null,
    modalLiveTracking: false,
    setModalReturn: jest.fn(),
    setModalLiveTracking: jest.fn(),
    onClickValidation: jest.fn(),
    onClickModalReturn: jest.fn(),
    openModalLiveTracking: jest.fn(),
    setPopUp: jest.fn(),
    isPopUpOpen: jest.fn(),
    visibilityUpdateActivity: { disable: false, visible: true },
    setVisibilityUpdateActivity: jest.fn(),
  };

  test('render', () => {
    useActions.mockReturnValueOnce(returnValueData);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail feature={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('render no id', () => {
    useActions.mockReturnValueOnce({ ...returnValueData, referenceId: '' });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail feature={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('render status report checking', () => {
    useActions.mockReturnValueOnce({
      ...returnValueData,
      data: {
        statusTicket: 'report checking',
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail feature={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('render status report issued', () => {
    useActions.mockReturnValueOnce({
      ...returnValueData,
      data: {
        statusTicket: 'report issued',
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail feature={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('render status fault analysis', () => {
    useActions.mockReturnValueOnce({
      ...returnValueData,
      data: {
        statusTicket: 'fault analysis',
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail feature={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('render status fault handling', () => {
    useActions.mockReturnValueOnce({
      ...returnValueData,
      data: {
        statusTicket: 'fault handling',
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail feature={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('render status fault completion', () => {
    useActions.mockReturnValueOnce({
      ...returnValueData,
      data: {
        statusTicket: 'fault completion',
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail feature={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('render status report rejected', () => {
    useActions.mockReturnValueOnce({
      ...returnValueData,
      data: {
        statusTicket: 'report rejected',
        fileEvidence: { fileUrl: 'url' },
        rejectReason: 'reject',
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail feature={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('render status report completed', () => {
    useActions.mockReturnValueOnce({
      ...returnValueData,
      data: {
        statusTicket: 'report completed',
        nps: { value: 8 },
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail feature={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('get gp worklog', () => {
    const baseWorklogItem = {
      status: 'Validasi',
      dateTime: '',
      note: '',
      description: '',
      noteProgress: '',
      class: '',
    };

    expect(getGPWorklog([baseWorklogItem])).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          date: '',
          note: '',
          status: 'REPORT CHECKING ',
        }),
      ]),
    );
    expect(getGPWorklog([{ ...baseWorklogItem, status: '' }])).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          date: '',
          note: '',
          status: '',
        }),
      ]),
    );
    expect(getGPWorklog([{ ...baseWorklogItem, class: 'class' }])).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          date: '',
          note: '',
          status: 'REPORT CHECKING | class',
        }),
      ]),
    );
    expect(
      getGPWorklog([{ ...baseWorklogItem, noteProgress: 'progress' }]),
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          date: '',
          status: 'REPORT CHECKING ',
        }),
      ]),
    );
    expect(getGPWorklog([{ ...baseWorklogItem, note: 'note' }])).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          date: '',
          note: 'note',
          status: 'REPORT CHECKING ',
        }),
      ]),
    );
    expect(getGPWorklog([{ ...baseWorklogItem, description: 'desc' }])).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          date: '',
          note: 'desc',
          status: 'REPORT CHECKING ',
        }),
      ]),
    );
  });

  test('priviledge validation', () => {
    expect(priviledge([])).toMatchObject({
      canDetail: false,
      canDetailHistory: false,
      canReject: false,
      canValidate: false,
    });
    expect(
      priviledge([
        'read_detail_ticket_general_product',
        'read_detail_history_ticket_general_product',
        'update_reject_ticket_general_product',
        'update_validate_ticket_general_product',
      ]),
    ).toMatchObject({
      canDetail: true,
      canDetailHistory: true,
      canReject: true,
      canValidate: true,
    });
  });
});
