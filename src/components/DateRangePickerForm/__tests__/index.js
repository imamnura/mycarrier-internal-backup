import React from 'react';
import useResponsive from '@utils/hooks/useResponsive';
import ShallowRenderer from 'react-test-renderer/shallow';
import DateRangePickerForm from '../DateRangePickerForm';

jest.mock('@utils/hooks/useResponsive');

describe('src/components-v2/DateRangePickerForm', () => {
  const props = {
    onChange: jest.fn(),
  };

  test('render', () => {
    useResponsive.mockReturnValueOnce(false);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DateRangePickerForm {...props} />);
    tree.props.children.props.onChange([new Date('10/10/2010'), null]);
    tree.props.children.props.renderInput({}, {});
    expect(tree).toMatchSnapshot();
  });

  test('render/mobile', () => {
    useResponsive.mockReturnValueOnce(true);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DateRangePickerForm {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
