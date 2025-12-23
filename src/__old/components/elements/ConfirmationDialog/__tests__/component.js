import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ConfirmationDialog from '../component';

describe('src/components/elements/ConfirmationDialog', () => {
  const props = {
    classes: {},
    content: 'label',
    secondaryContent: 'secondary',
    onClose: jest.fn(),
    actions: [
      { label: 'label 1', action: jest.fn(), fulWidth: false },
      { label: 'label 2', action: jest.fn(), fulWidth: false },
    ],
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ConfirmationDialog {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render 3 actions', () => {
    const customProps = {
      ...props,
      actions: [
        ...props.actions,
        { label: 'label 3', action: jest.fn(), fulWidth: false },
      ],
    };

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ConfirmationDialog {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
