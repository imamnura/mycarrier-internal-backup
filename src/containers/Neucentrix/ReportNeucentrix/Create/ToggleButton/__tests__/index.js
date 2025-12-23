import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ToggleButton from '../ToggleButton';

describe('src/containers/Neucentrix/ReportNeucentrix/Create/ToggleButton', () => {
  test('render', () => {
    const props = {
      onChange: jest.fn(),
    };

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ToggleButton {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.onChange();
  });
});
