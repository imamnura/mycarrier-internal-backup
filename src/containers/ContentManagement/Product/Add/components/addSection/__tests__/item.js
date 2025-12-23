import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Item from '../item';
import { cleanup } from '@testing-library/react-hooks/server';
import styles from '../../styles';

jest.mock('../../styles');

const props = {
  action: {},
  active: 'test',
  classes: {},
  label: 'test',
};

describe('src/containers/ContentManagement/Product/Add/lib/components/item', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    styles.mockReturnValue({});
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Item {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
