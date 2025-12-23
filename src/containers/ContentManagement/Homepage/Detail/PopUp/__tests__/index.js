import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Detail from '../Detail';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/ContentManagement/Homepage/Detail/PopUp', () => {
  const useActionReturn = {
    data: {},
    loading: false,
    breadcrumb: [],
    onClickDelete: jest.fn(),
    onClickEdit: jest.fn(),
    onClickUpdateStatus: jest.fn(),
  };

  const props = {
    feature: ['update_popup_banner', 'delete_popup_banner'],
  };

  test('run properly', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('run properly with no privilege access', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail feature={[]} />);
    expect(tree).toMatchSnapshot();
  });
});
