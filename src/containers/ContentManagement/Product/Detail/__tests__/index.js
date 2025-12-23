import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Component from '../index';
import useActions from '../hooks/useActions';
import useStyles from '../styles';
import { cleanup } from '@testing-library/react-hooks/server';
import { useLottie } from 'lottie-react';

jest.mock('../hooks/useActions');
jest.mock('../styles');
jest.mock('lottie-react');
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    query: { id: 'test' },
  }),
}));

const actions = {
  choosedContent: 0,
  setChoosedContent: jest.fn(),
  clearConfirmation: jest.fn(),
  confirmation: {},
  detail: { id: 'test' },
  handleOpenSubDetail: jest.fn(),
  handleSpecialPage: jest.fn(),
  isLoading: false,
  onAddPage: jest.fn(),
  onChangeDisplay: jest.fn(),
  onDelete: jest.fn(),
  onEdit: jest.fn(),
  addProduct: jest.fn(),
  onCloseDialog: jest.fn(),
  openDialog: false,
  levelDetail: 'l0',
  stepDetail: 1,
  openPreviewState: { openPreview: false, setOpenPreview: jest.fn() },
};

const props = {
  feature: ['delete_product', 'update_product'],
};

describe('src/containers/ContentManagement/Product/Detail/index', () => {
  afterEach(() => {
    cleanup();
  });

  beforeAll(() => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date('10 October 2022 08:08:08 UTC'));
    useStyles.mockReturnValue({ classes: {} });
    useLottie.mockReturnValue({});
  });

  test('render', () => {
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
    tree.props.children[2].props.onClose();
    tree.props.children[0].props.action[0].onClick(); //PREVIEW PAGE
    tree.props.children[0].props.action[1].onClick(); //DELETE
    tree.props.children[0].props.action[2].onClick(); //EDIT
  });

  test('render without feature', () => {
    const customProps = { ...props, feature: [''] };
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render notFound catId', () => {
    const customActions = { ...actions, detail: { catId: 1 } };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
