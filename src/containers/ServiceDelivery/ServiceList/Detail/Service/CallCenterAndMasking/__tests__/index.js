import React from 'react';
import { useRouter } from 'next/router';
import ShallowRenderer from 'react-test-renderer/shallow';
import Detail from '../CallCenterAndMasking';

jest.mock('next/router');

describe('src/containers/ServiceDelivery/ServiceList/Detail/Service/CallCenterAndMasking', () => {
  test('render', () => {
    useRouter.mockReturnValue({
      query: { params: '0123', id: '0123', serviceType: 'call-center' },
      push: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });
});
