import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import DetailedList from '../DetailedList';
import useResponsive from '../../../utils/hooks/useResponsive';

jest.mock('../../../utils/hooks/useResponsive');

describe('src/components-v2/elements/DetailedList', () => {
  const props = {
    data: [{ name: 'name' }],
    schema: [{ label: 'label', name: 'name' }],
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DetailedList {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render mobile', () => {
    useResponsive.mockReturnValueOnce(true);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DetailedList {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render no data', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DetailedList {...props.schema} />);
    expect(tree).toMatchSnapshot();
  });
});
