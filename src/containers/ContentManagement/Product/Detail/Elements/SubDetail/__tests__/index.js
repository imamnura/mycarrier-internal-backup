import React, { useEffect, useState } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SubDetail from '../SubDetail';
import useActions from '../../../hooks/useActions';
import { cleanup } from '@testing-library/react-hooks/server';
import { useLottie } from 'lottie-react';

jest.mock('../../../hooks/useActions');
jest.mock('lottie-react');
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: 'level1',
    query: { id: 1, params: 'test params' },
  }),
}));
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
  useState: jest.fn(),
}));

const actions = {
  clearConfirmation: jest.fn(),
  confirmation: {},
  detail: { name: 'test', category: [{ title: 'test' }], catId: '11' },
  isLoading: false,
  onDelete: jest.fn(),
  onEdit: jest.fn(),
  levelDetail: '',
  stepDetail: 0,
  openPreviewState: { openPreview: false, setOpenPreview: jest.fn() },
};

const props = {
  feature: ['delete_product', 'update_product'],
};

describe('src/containers/ContentManagement/Product/Detail/Elements/SubDetail', () => {
  afterEach(() => {
    cleanup();
  });

  const setState = jest.fn();

  beforeAll(() => {
    useEffect.mockImplementation((func) => func());
    useState.mockImplementation((init) => [init, setState]);

    jest
      .useFakeTimers()
      .setSystemTime(new Date('10 October 2022 08:08:08 UTC'));
    useLottie.mockReturnValue({});
  });

  test('render', () => {
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SubDetail {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[1].props.onClose(); //clearConfirmation
    tree.props.children[0].props.action[0].onClick(); //PREVIEW PAGE
    tree.props.children[0].props.action[1].onClick(); //DELETE
    tree.props.children[0].props.action[2].onClick(); //EDIT
  });

  test('render catId false', () => {
    const customActions = {
      ...actions,
      detail: { name: 'test', category: [{ title: 'test' }], catId: '' },
    };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SubDetail {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
