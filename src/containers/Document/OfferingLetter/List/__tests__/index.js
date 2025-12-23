import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const actions = {
  feature: [
    'create_new_offerinng_letter',
    'read_offering_letter_approve',
    'update_offering_letter_draft',
    'read_detail_offering_letter',
    'read_list_all_offering_letter',
  ],
  filterStatus: [{ label: 'All Status', value: '' }],
  list: {
    data: [
      {
        quotationId: 'quotationId',
        companyName: 'companyName',
        status: 'draft',
        step: 1,
        createdAt: '2021-09-09T07:16:04.511Z',
        updatedAt: '2021-10-04T11:22:42.526Z',
      },
    ],
    meta: {},
    hasMore: false,
  },
  loading: {
    tableRoot: true,
    tableRow: false,
  },
  manager: false,
  onBottomPage: jest.fn(),
  onClickNewQuotation: jest.fn(),
  onClickRowTable: jest.fn(),
  setFilterStatus: jest.fn(),
};

describe('src/pages/Document/Quotation', () => {
  test('render', () => {
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List feature={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/other case', () => {
    useActions.mockReturnValue({
      ...actions,
      feature: [],
      manager: true,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List feature={[]} />);
    expect(tree).toMatchSnapshot();
  });
});
