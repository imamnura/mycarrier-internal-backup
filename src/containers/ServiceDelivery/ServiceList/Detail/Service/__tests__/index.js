import { useRouter } from 'next/router';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Detail from '../Detail';

jest.mock('next/router');

describe('src/containers/ServiceDelivery/ServiceList/Detail/Service', () => {
  test('render properly as MRTG', () => {
    useRouter.mockReturnValue({
      query: { serviceType: 'MRTG' },
      push: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });

  test('render properly as call-center', () => {
    useRouter.mockReturnValue({
      query: { serviceType: 'call-center' },
      push: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });

  test('render properly without params', () => {
    useRouter.mockReturnValue({ query: { params: '' }, push: jest.fn() });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });
});
