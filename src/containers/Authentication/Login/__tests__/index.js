import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Login from '../Login';
import { LOCATOR } from '../test-locator';

describe('src/pages/Authentication/Login', () => {
  test('render', () => {
    const locator = LOCATOR;
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Login {...locator} />);
    expect(tree).toMatchSnapshot();
  });
});
