import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Reject from '../Reject';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/components-v2/elements/Form/Reject', () => {
  const props = {
    maxLength: 10,
    onSubmit: jest.fn(),
    onClose: jest.fn(),
    titleText: 'test',
  };

  test('render', () => {
    useActions.mockReturnValue({
      formState: {
        isValid: true,
        isDirty: false,
      },
      control: {},
      handleSubmit: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Reject {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
