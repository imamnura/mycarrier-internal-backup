import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Detail from '../Detail';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

const props = { feature: ['read_detail_service_list'] };

describe('src/containers/ServiceDelivery/ServiceList/Detail/Customer', () => {
  test('render properly', () => {
    useActions.mockReturnValue({
      data: {},
      action: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail {...props} />);
    expect(tree).toMatchSnapshot();
  });
  test('render properly have project', () => {
    useActions.mockReturnValue({
      data: {
        isHaveProject: true,
      },
      action: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
