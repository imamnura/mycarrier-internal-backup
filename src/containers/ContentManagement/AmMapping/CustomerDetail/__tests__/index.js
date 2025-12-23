import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import CustomerDetail from '../CustomerDetail';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/ContentManagement/AmMapping/CustomerDetail/index', () => {
  const props = { loading: false };

  const useActionReturn = {
    data: { status: 'success', lastUpdate: 'test' },
    loading: false,
    id: 'test',
  };

  test('render', () => {
    useActions.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CustomerDetail {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render not found', () => {
    useActions.mockReturnValue({ ...useActionReturn, id: '', data: null });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CustomerDetail {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
