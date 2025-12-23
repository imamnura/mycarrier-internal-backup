import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Detail from '../Detail';
import { useRouter } from 'next/router';

jest.mock('next/router');

describe('src/containers/Document/PurchaseOrder/Detail-v2', () => {
  test('render properly', () => {
    useRouter.mockReturnValue({ query: { orderType: '' }, push: jest.fn() });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });
  test('render properly at Trial', () => {
    useRouter.mockReturnValue({
      query: { orderType: 'Trial' },
      push: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });
  test('render properly at Subscribe', () => {
    useRouter.mockReturnValue({
      query: { orderType: 'Subscribe' },
      push: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });
  test('render properly at New Install', () => {
    useRouter.mockReturnValue({
      query: { orderType: 'New Install' },
      push: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });
  test('render properly at Disconnect', () => {
    useRouter.mockReturnValue({
      query: { orderType: 'Disconnect' },
      push: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });
  test('render properly at Modify', () => {
    useRouter.mockReturnValue({
      query: { orderType: 'Modify' },
      push: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Detail />);
    expect(tree).toMatchSnapshot();
  });
});
