import { useRouter } from 'next/router';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ForgotPassword from '../index';

// jest.mock('next/router');

describe('src/containers/Authentication/ForgotPassword', () => {
  beforeAll(() => {
    useRouter.mockReturnValue({ query: { code: 'code' } });
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ForgotPassword />);
    expect(tree).toMatchSnapshot();
  });
});
