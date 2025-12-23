import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import CPNameForm from '../component';

describe('src/components/forms/CPNameForm', () => {
  const props = {
    classes: {},
    getDownload: jest.fn(),
    handleSubmit: jest.fn(),
    id: '',
    invalid: true,
    onClose: jest.fn(),
    submitting: false,
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CPNameForm {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render submitting', () => {
    const customProps = {
      ...props,
      invalid: false,
      submitting: true,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CPNameForm {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
