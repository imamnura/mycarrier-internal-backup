import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import LoadingBar from '../LoadingBar';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/Components/LoadingBar', () => {
  test('render', () => {
    useActions.mockReturnValue({ progress: 50 });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<LoadingBar loading={true} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/finished', () => {
    useActions.mockReturnValue({ progress: 100 });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<LoadingBar loading={true} />);
    expect(tree).toMatchSnapshot();
  });
});
