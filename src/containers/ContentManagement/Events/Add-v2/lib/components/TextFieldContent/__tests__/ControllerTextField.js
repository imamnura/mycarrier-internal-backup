import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ControllerTextField from '../ControllerTextField';
import { cleanup } from '@testing-library/react-hooks/server';

const props = {
  control: {},
  name: 'test',
  helperText: 'test',
  error: false,
  rules: {},
};

describe('src/containers/ContentManagement/Events/Add-v2/lib/components/TextFieldContent/ControllerTextField', () => {
  afterEach(() => {
    cleanup();
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ControllerTextField {...props} />);
    tree.props.render({
      field: {
        onChange: jest.fn(),
      },
      fieldState: {},
    });
    expect(tree).toMatchSnapshot();
  });

  test('render tab en', () => {
    const customProps = { ...props, tab: 'en' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ControllerTextField {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
