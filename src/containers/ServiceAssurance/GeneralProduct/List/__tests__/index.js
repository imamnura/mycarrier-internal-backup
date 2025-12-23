import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import useAction from '../hooks/useActions';
import List from '../List';

jest.mock('../hooks/useActions');

describe('src/containers/ServiceAssurance/GeneralProduct/List', () => {
  const useActionReturn = {
    list: {
      data: [
        {
          status: 'completed',
          fileEvidence: {
            fileName: '',
          },
          mttr: 1000,
        },
        {
          status: 'onprogress',
          fileEvidence: {
            fileName: '',
          },
          mttr: 1000,
        },
        {
          status: 'checking',
          fileEvidence: {
            fileName: '',
          },
          mttr: 1000,
        },
      ],
      meta: [],
    },
    loading: {
      tableRoot: false,
      tableRow: false,
      download: false,
    },
    onBottomPage: jest.fn(),
    filterProgress: { label: 'All Progress', value: '' },
    filterStatus: { label: 'All Status', value: '' },
    setFilterProgress: jest.fn(),
    setFilterStatus: jest.fn(),
    search: '',
    setSearch: jest.fn(),
    setTab: jest.fn(),
    file: '',
    onClickRefresh: jest.fn(),
    openPreview: false,
    setOpenPreview: jest.fn(),
    onClosePreview: jest.fn(),
    evidenceFile: { fileUrl: '', fileName: '' },
    setEvidenceFile: jest.fn(),
    onClickDownloadEvidence: jest.fn(),
  };

  test('render', () => {
    const props = {
      feature: [
        'read_list_approval_ticket_general_product',
        'read_list_history_ticket_general_product',
        'update_validate_ticket_general_product',
        'read_downloadApproval',
        'read_downloadHistory',
        'create_ticket_general_product',
      ],
    };
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab approval', () => {
    const props = {
      feature: [
        'read_list_approval_ticket_general_product',
        'read_list_history_ticket_general_product',
        'update_validate_ticket_general_product',
        'read_downloadApproval',
        'read_downloadHistory',
        'create_ticket_general_product',
      ],
    };
    useAction.mockReturnValue({
      ...useActionReturn,
      tab: 'approval',
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab approval no feature', () => {
    const props = {
      feature: [''],
    };
    useAction.mockReturnValue({
      ...useActionReturn,
      tab: 'approval',
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab history', () => {
    const props = {
      feature: [
        'read_list_approval_ticket_general_product',
        'read_list_history_ticket_general_product',
        'update_validate_ticket_general_product',
        'read_downloadApproval',
        'read_downloadHistory',
        'create_ticket_general_product',
      ],
    };
    useAction.mockReturnValue({
      ...useActionReturn,
      tab: 'history',
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab history no feature', () => {
    const props = {
      feature: [''],
    };
    useAction.mockReturnValue({
      ...useActionReturn,
      tab: 'history',
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render no tab', () => {
    const props = {
      feature: [
        'read_list_approval_ticket_general_product',
        'read_list_history_ticket_general_product',
        'update_validate_ticket_general_product',
        'read_downloadApproval',
        'read_downloadHistory',
        'create_ticket_general_product',
      ],
    };
    useAction.mockReturnValue({
      ...useActionReturn,
      tab: '',
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
