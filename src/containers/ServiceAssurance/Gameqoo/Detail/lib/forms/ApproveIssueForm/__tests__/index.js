import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ApproveIssueForm from '../ApproveIssueForm';
import useActions from '../hooks/useActions';
import useStyles from '../styles';
import NonNetwork from '@assets/icon-v2/NonNetwork';

jest.mock('../styles');
jest.mock('../hooks/useActions');

describe('src/containers/ServiceAssurance/Gameqoo/Detail/lib/forms/ApproveIssueForm', () => {
  const returnValueData = {
    onSubmit: jest.fn(),
    onClose: jest.fn(),
    networkTypeList: [],
    networkType: null,
    setNetworkType: jest.fn(),
  };

  test('render', () => {
    useActions.mockReturnValueOnce(returnValueData);
    useStyles.mockReturnValueOnce({});
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ApproveIssueForm modalApproveIssue={null} />);
    expect(tree).toMatchSnapshot();
  });

  test('render with network type list', () => {
    useActions.mockReturnValueOnce({
      ...returnValueData,
      networkTypeList: [
        {
          id: 'id',
          Icon: NonNetwork,
          label: 'label',
          desc: 'desc',
        },
      ],
    });
    useStyles.mockReturnValueOnce({});
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ApproveIssueForm modalApproveIssue={null} />);
    expect(tree).toMatchSnapshot();
  });

  test('render other condition', () => {
    useActions.mockReturnValueOnce({
      ...returnValueData,
      networkTypeList: [
        {
          id: 'id',
          Icon: NonNetwork,
          label: 'label',
          desc: 'desc',
        },
      ],
      networkType: 'id',
    });
    useStyles.mockReturnValueOnce({});
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <ApproveIssueForm
        modalApproveIssue={{
          title: 'title',
          textInfo: 'info',
          caption: 'caption',
        }}
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});
