import { useRouter } from 'next/router';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Component from '../Detail';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');
jest.mock('next/router');

const useActionReturn = {
  loading: false,
  detail: {
    reportId: 'RP198757',
    status: 'Forwarded to WDM',
  },
  action: jest.fn().mockResolvedValue([{}]),
};

const props = {
  match: { params: { id: 'RP198757' } },
  feature: [
    'read_detail_report_ncx',
    'create_report_ncx',
    'create_file_ncx',
    'update_file_ncx',
    'create_company_name_ncx',
  ],
};

describe('src/pages/Document/ReportNeucentrix/Detail', () => {
  beforeEach(() => {
    useRouter.mockReturnValue({ query: { id: 'id' } });
  });
  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render loading', () => {
    useAction.mockReturnValue({
      isLoading: true,
      detail: {},
      action: jest.fn().mockResolvedValue([{}]),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render empty data', () => {
    useAction.mockReturnValue({
      isLoading: false,
      detail: {},
      action: jest.fn().mockResolvedValue([{}]),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render status send to customer', () => {
    useAction.mockReturnValue({
      isLoading: false,
      detail: {
        reportId: 'RP198757',
        status: 'Send to Customer',
      },
      action: jest.fn().mockResolvedValue([{}]),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
