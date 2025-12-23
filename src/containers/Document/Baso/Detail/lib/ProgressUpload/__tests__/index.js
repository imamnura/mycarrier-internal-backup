import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ProgressUpload from '../ProgressUpload';

describe('src/containers/Document/Baso/Detail-v2/lib/ProgressUpload', () => {
  const props = {
    modalProgressUpload: { open: true },
    progress: 10,
  };

  test('render success', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProgressUpload {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
