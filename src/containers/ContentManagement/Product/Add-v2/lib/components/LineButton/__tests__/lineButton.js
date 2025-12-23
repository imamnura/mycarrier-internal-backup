import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import LineButton from '../lineButton';
import { cleanup } from '@testing-library/react-hooks/server';
import useStyles from '../styles';

jest.mock('../styles');

const props = {
  handleClick: jest.fn(),
  label: 'test',
  variant: 'default',
};

describe('src/containers/ContentManagement/Product/Add-v2/lib/components/LineButton', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    useStyles.mockReturnValue({});
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<LineButton {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render variant primary', () => {
    const customProps = { ...props, variant: 'primary' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<LineButton {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
