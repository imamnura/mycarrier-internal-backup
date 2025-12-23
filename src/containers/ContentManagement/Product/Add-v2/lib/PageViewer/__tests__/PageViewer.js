import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import PageViewer from '../PageViewer';
import { cleanup } from '@testing-library/react-hooks/server';
import useStyles from '../styles';

jest.mock('../styles');

const props = {
  onClose: jest.fn(),
  actionButton: null,
  title: 'test',
  open: false,
  children: 'test',
};

describe('src/containers/ContentManagement/Product/Add-v2/lib/PageViewer', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    useStyles.mockReturnValue({});
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PageViewer {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render open', () => {
    const customProps = { ...props, open: true, actionButton: [] };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PageViewer {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
