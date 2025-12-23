import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Reviewers from '../Reviewers';
import useStyles from '../../styles';
import { cleanup } from '@testing-library/react-hooks/server';

jest.mock('../../styles');

const props = {
  idx: 0,
  data: [
    { name: 'test', email: 'tests', status: 'test', createdAt: 'test' },
    { name: 'test2', email: 'tests2', status: 'test2', createdAt: 'test2' },
  ],
  initialExpandedIndexes: [],
};

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/Detail/elements/HistorySendLog/elements/reviewers', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    useStyles.mockReturnValue({});
  });

  test('render properly', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Reviewers {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render createdAt null', () => {
    const customProps = {
      ...props,
      initialExpandedIndexes: [0],
      data: [
        { name: 'test', email: 'tests', status: 'test' },
        { name: 'test2', email: 'tests2', status: 'test2' },
      ],
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Reviewers {...customProps} />);
    expect(tree).toMatchSnapshot();
    tree.props.children.props.children[1].props.children[1].props.children.props.onClick(); //toogleShowApproval
  });

  test('render data', () => {
    const customProps = { ...props, initialExpandedIndexes: [0] };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Reviewers {...customProps} />);
    expect(tree).toMatchSnapshot();
    tree.props.children.props.children[1].props.children[1].props.children.props.onClick(); //toogleShowApproval
  });
  test('render data idx 2', () => {
    const customProps = { ...props, idx: 2, initialExpandedIndexes: [0] };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Reviewers {...customProps} />);
    expect(tree).toMatchSnapshot();
    tree.props.children.props.children[1].props.children[1].props.children.props.onClick(); //toogleShowApproval
  });
});
