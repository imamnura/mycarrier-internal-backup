import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Detail from '../Detail';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

const props = {
  feature: [],
};

describe('src/containers/LeadManagementSystem/Dashboard/Detail/index', () => {
  test('render properly', () => {
    useActions.mockReturnValueOnce({
      data: {
        status: 'Need Validation',
        companyDetail: { statusCa: false },
        worklog: [{}],
      },
      fetchDetail: jest.fn(),
      interestId: '123',
      loading: false,
      onUpdateStatus: jest.fn(),
      setData: jest.fn().mockReturnValue(jest.fn()),
      setPopUp: jest.fn().mockReturnValue(jest.fn()),
      isPopUpOpen: jest.fn(),
      prerequisite: { data: [] },
      caNumberConverter: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render properly Valid', () => {
    useActions.mockReturnValueOnce({
      data: { status: 'Valid', validBy: 'amMapping', worklog: [{}] },
      fetchDetail: jest.fn(),
      interestId: '123',
      loading: false,
      onUpdateStatus: jest.fn(),
      setData: jest.fn().mockReturnValue(jest.fn()),
      setPopUp: jest.fn().mockReturnValue(jest.fn()),
      isPopUpOpen: jest.fn(),
      prerequisite: { data: [] },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render properly Qualify', () => {
    useActions.mockReturnValueOnce({
      data: { status: 'Qualify', worklog: [{}] },
      fetchDetail: jest.fn(),
      interestId: '123',
      loading: false,
      onUpdateStatus: jest.fn(),
      setData: jest.fn().mockReturnValue(jest.fn()),
      setPopUp: jest.fn().mockReturnValue(jest.fn()),
      isPopUpOpen: jest.fn(),
      prerequisite: { data: [] },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render properly Opportunity', () => {
    useActions.mockReturnValueOnce({
      data: { status: 'Opportunity', worklog: [{}] },
      fetchDetail: jest.fn(),
      interestId: '123',
      loading: false,
      onUpdateStatus: jest.fn(),
      setData: jest.fn().mockReturnValue(jest.fn()),
      setPopUp: jest.fn().mockReturnValue(jest.fn()),
      isPopUpOpen: jest.fn(),
      prerequisite: { data: [] },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render properly Quote', () => {
    useActions.mockReturnValueOnce({
      data: { status: 'Quote', worklog: [{}] },
      fetchDetail: jest.fn(),
      interestId: '123',
      loading: false,
      onUpdateStatus: jest.fn(),
      setData: jest.fn().mockReturnValue(jest.fn()),
      setPopUp: jest.fn().mockReturnValue(jest.fn()),
      isPopUpOpen: jest.fn(),
      prerequisite: { data: [] },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render properly Agreement', () => {
    useActions.mockReturnValueOnce({
      data: { status: 'Agreement', worklog: [{}] },
      fetchDetail: jest.fn(),
      interestId: '123',
      loading: false,
      onUpdateStatus: jest.fn(),
      setData: jest.fn().mockReturnValue(jest.fn()),
      setPopUp: jest.fn().mockReturnValue(jest.fn()),
      isPopUpOpen: jest.fn(),
      prerequisite: { data: [] },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render properly Delay Quote', () => {
    useActions.mockReturnValueOnce({
      data: { status: 'Delay Quote', worklog: [{}] },
      fetchDetail: jest.fn(),
      interestId: '123',
      loading: false,
      onUpdateStatus: jest.fn(),
      setData: jest.fn().mockReturnValue(jest.fn()),
      setPopUp: jest.fn().mockReturnValue(jest.fn()),
      isPopUpOpen: jest.fn(),
      prerequisite: { data: [] },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
