import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import TextFieldContent from '../TextFieldContent';
import { cleanup } from '@testing-library/react-hooks/server';
import useStyles from '../styles';

jest.mock('../styles');

const props = {
  placeholder: 'test',
  control: {},
  position: 'left',
  fontSize: 14,
  name: 'test',
  weight: 'normal',
  colorPlaceholder: 'black',
  noSpacing: false,
  colorInput: '#2E434D',
};

describe('src/containers/ContentManagement/Events/Add-v2/lib/components/TextFieldContent/TextFieldContent', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    useStyles.mockReturnValue({});
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TextFieldContent {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
