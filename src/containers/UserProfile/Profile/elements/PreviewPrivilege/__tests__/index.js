import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import PreviewPrivilege from '../PreviewPrivilege';
import useStyles from '../styles';

jest.mock('../styles');

describe('src/containers/UserProfile/Profile/elements/PreviewPrivilege/index', () => {
  beforeEach(() => {
    useStyles.mockReturnValue({});
  });

  const props = {
    loading: false,
    data: [
      { title: 'test', child: [{}, {}], subTitle: 'test' },
      { title: 'test', child: '', subTitle: 'test' },
    ],
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PreviewPrivilege {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render loading true', () => {
    const customProps = { ...props, loading: true };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PreviewPrivilege {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
