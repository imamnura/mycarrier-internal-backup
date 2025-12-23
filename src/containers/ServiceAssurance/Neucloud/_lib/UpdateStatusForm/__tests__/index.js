import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Form from '../index';

describe('src/pages/ServiceAssurance/Neucloud/_lib/UpdateStatusForm/index', () => {
  test('render', () => {
    const props = {
      onClose: jest.fn(),
      onSubmit: jest.fn(),
      caption: 'updated the status',
      title: 'update status',
      useform: {
        control: {},
        handleSubmit: jest.fn(),
        formState: {},
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Form {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
