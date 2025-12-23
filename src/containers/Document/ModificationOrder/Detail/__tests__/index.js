import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Component from '../Detail';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');
jest.mock('next/router');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

const useActionReturn = {
  loading: false,
  data: {
    orderNumber: 'PO198757',
  },
  action: jest.fn(),
};

const props = { feature: [] };

describe('src/pages/Document/ModificationOrder/Detail', () => {
  beforeEach(() => {
    useRouter.mockReturnValue({ query: { id: 'id' } });
  });

  useState.mockImplementation((v) => [v, jest.fn()]);

  test('render', () => {
    const setHiden = jest.fn();
    useState.mockImplementationOnce(() => [{ 0: true, 1: true }, setHiden]);
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render loading', () => {
    useAction.mockReturnValue({
      isLoading: true,
      data: {},
      ...useActionReturn,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render empty data', () => {
    useAction.mockReturnValue({
      isLoading: false,
      data: {},
      ...useActionReturn,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
