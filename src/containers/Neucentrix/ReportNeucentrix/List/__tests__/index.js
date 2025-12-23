import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/pages/Document/ReportNeucentrix/List', () => {
  const props = {
    feature: [],
  };

  const useActionReturn = {
    feature: [],
    filterStatus: { label: 'All Status', value: '' },
    list: {
      data: [],
      meta: [],
    },
    loading: {
      tableRoot: false,
      tableRow: false,
      filterCompany: false,
    },
    onBottomPage: jest.fn(),
    onClickUploadReport: jest.fn(),
    onClickRowTable: jest.fn(),
  };

  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render with access to add new report', () => {
    useAction.mockReturnValue({
      ...useActionReturn,
      feature: ['create_report_ncx'],
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
