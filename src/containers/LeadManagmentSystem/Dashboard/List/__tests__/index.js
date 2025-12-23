import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useAction from '../hooks/useAction';
import { useRouter } from 'next/router';

jest.mock('../hooks/useAction');
jest.mock('next/router');

const actions = {
  feature: ['read_download_list_lead', 'create_new_lead_by_am_lead'],
  formDownload: true,
  onCreate: jest.fn(),
  onDownload: jest.fn(),
  setFormDownload: jest.fn(),
};

describe('src/pages/LeadManagementSystem/Dashboard/List', () => {
  beforeEach(() => {
    useAction.mockImplementation(() => actions);
    useRouter.mockReturnValue({ push: jest.fn() });
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List />);
    expect(tree).toMatchSnapshot();
  });
});
