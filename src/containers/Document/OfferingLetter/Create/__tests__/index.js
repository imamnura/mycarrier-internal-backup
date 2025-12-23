import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Create from '../Create';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const actions = {
  data: {},
  loading: false,
  setTab: jest.fn(),
  tab: 1,
  setData: jest.fn(),
};

describe('src/containers/Document/OfferingLetter/Create/index', () => {
  test('render', () => {
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Create />);
    expect(tree).toMatchSnapshot();
  });
  test('render ServiceSpecification', () => {
    useAction.mockReturnValue({ ...actions, tab: 2 });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Create />);
    expect(tree).toMatchSnapshot();
  });
  test('render TermsAndCondition', () => {
    useAction.mockReturnValue({ ...actions, tab: 3 });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Create />);
    expect(tree).toMatchSnapshot();
  });
  test('render TermsAndCondition 2', () => {
    useAction.mockReturnValue({ ...actions, tab: 4 });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Create />);
    expect(tree).toMatchSnapshot();
  });
});
