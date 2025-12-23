import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import TextField from '../TextField';
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
};

describe('src/containers/ContentManagement/Product/Add-v2/lib/TextField', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    useStyles.mockReturnValue({});
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TextField {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
