import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SalesTeamPicker from '../SalesTeamPicker';
import useAction from '../hooks/useAction';
import useStyles from '../styles';

jest.mock('../styles');
jest.mock('../hooks/useAction');

describe('src/containers/LeadManagmentSystem/Dashboard/_elements/SalesTeamPicker/index', () => {
  const returnValueData = {
    loading: false,
    option: [
      {
        _id: 'test',
        name: 'test',
        jobTitle: 'test',
        nik: 'test',
        generalManager: 'test',
        segment: 'test',
      },
      {
        _id: 'test',
        name: 'test',
        jobTitle: 'test',
        nik: 'test',
        generalManager: 'test',
        segment: 'test',
      },
    ],
    search: 'test',
    selected: [{}, {}],
    isPopup: false,
    scrollToTop: {},
    setSearch: jest.fn(),
    setSelected: jest.fn(),
  };

  test('render', () => {
    useAction.mockReturnValueOnce(returnValueData);
    useStyles.mockReturnValueOnce({});
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SalesTeamPicker />);
    expect(tree).toMatchSnapshot();
  });

  test('render loading', () => {
    useAction.mockReturnValueOnce({ ...returnValueData, loading: true });
    useStyles.mockReturnValueOnce({});
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SalesTeamPicker />);
    expect(tree).toMatchSnapshot();
  });

  test('render isPopup true', () => {
    useAction.mockReturnValueOnce({ ...returnValueData, isPopup: true });
    useStyles.mockReturnValueOnce({});
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SalesTeamPicker />);
    expect(tree).toMatchSnapshot();
  });

  test('render option null', () => {
    useAction.mockReturnValueOnce({ ...returnValueData, option: [] });
    useStyles.mockReturnValueOnce({});
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SalesTeamPicker />);
    expect(tree).toMatchSnapshot();
  });

  test('render option false', () => {
    useAction.mockReturnValueOnce({
      ...returnValueData,
      option: [
        {
          _id: 'test',
          name: '',
          jobTitle: '',
          nik: '',
          generalManager: '',
          segment: '',
        },
      ],
    });
    useStyles.mockReturnValueOnce({});
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SalesTeamPicker />);
    expect(tree).toMatchSnapshot();
  });
});
