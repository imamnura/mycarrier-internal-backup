import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import DynamicOptionsSelect from '../DynamicOptionsSelect';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const useActionReturn = {
  options: [{}],
  currentValue: 'test',
};

describe('src/containers/Document/OfferingLetter/_elements/DynamicOptionsSelect/index', () => {
  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DynamicOptionsSelect />);
    expect(tree).toMatchSnapshot();
  });
  test('render currentValue null', () => {
    useAction.mockReturnValue({ ...useActionReturn, currentValue: null });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DynamicOptionsSelect />);
    expect(tree).toMatchSnapshot();
  });
});
