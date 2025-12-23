import { useSnackbar } from 'notistack';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Topology from '../Topology';

jest.mock('notistack');

describe('src/components/Topology', () => {
  const props = {
    data: [
      {
        message: 'PE-D1-PUB-VPN',
        info: 'Status: UP',
      },
      {
        message: 'GigabitEthernet0/0',
        info: '',
      },
      {
        message: 'GigabitEthernet0/1',
        info: '',
      },
    ],
  };

  test('render', () => {
    useSnackbar.mockReturnValue({ enqueueSnackbar: jest.fn() });
    global.navigator.clipboard = {
      writeText: jest.fn(),
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Topology {...props} />);

    tree.props.children[1].props.children[0].props.children[0].props.children[0].props.children[1].props.onClick();

    expect(tree).toMatchSnapshot();
  });
});
