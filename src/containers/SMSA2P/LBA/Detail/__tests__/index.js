import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Component from '../Detail';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');
jest.mock('../../utils');

const useActionReturn = {
  loading: false,
  data: {
    activationStatus: 'checking',
  },
  action: jest.fn(),
};

const props = { feature: [] };

describe('src/containers/SMSA2P/LBA/Detail', () => {
  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render with notification status', () => {
    useAction.mockReturnValue({
      ...useActionReturn,
      emailStatus: 'Failed',
      hasAccessResend: true,
      countDown: 45,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
