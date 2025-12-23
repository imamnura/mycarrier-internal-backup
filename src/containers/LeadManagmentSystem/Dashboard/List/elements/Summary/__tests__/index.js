import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Summary from '../Summary';
import useAction from '../hooks/useAction';
import useStyles from '../styles';

jest.mock('../styles');
jest.mock('../hooks/useAction');

describe('src/containers/LeadManagmentSystem/Dashboard/List/elements/Summary/index', () => {
  const returnValueData = {
    filterDateSubmit: [],
    setFilterDateSubmit: jest.fn(),
    redirectToReport: jest.fn(),
    data: [{ label: 'test', color: 'test' }],
    loading: false,
    totalData: {},
  };

  test('render', () => {
    useAction.mockReturnValueOnce(returnValueData);
    useStyles.mockReturnValueOnce({});
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Summary />);
    expect(tree).toMatchSnapshot();
  });

  test('render loading true', () => {
    useAction.mockReturnValueOnce({ ...returnValueData, loading: true });
    useStyles.mockReturnValueOnce({});
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Summary />);
    expect(tree).toMatchSnapshot();
  });
});
