import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import LeadValidSummary from '../LeadValidSummary';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const actions = {
  filterDateSubmit: '',
  setFilterDateSubmit: jest.fn(),
  redirectToReport: jest.fn(),
  data: [{ label: 'test', color: 'red' }],
  loading: false,
  totalData: 10,
  countSlider: ['0', '1'],
  dotsActive: 0,
  setDotsActive: jest.fn(),
  dateOn: '',
};

describe('src/pages/LeadManagementSystem/Dashboard/List/elements/LeadValidSummary', () => {
  beforeEach(() => {
    useAction.mockImplementation(() => actions);
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<LeadValidSummary />);
    expect(tree).toMatchSnapshot();
  });
});
