import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import MarketingToolkit from '../index';
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
  }),
}));

const actions = {
  l2Documents: [
    { name: 'test', id: 1 },
    { name: 'test 2', id: 2 },
  ],
  handleAddFile: jest.fn(),
  handleDelete: jest.fn(),
  previewMode: false,
  nameProduct: 'test',
  isDisplayProductMarketingToolkit: false,
  setIsDisplayProductMarketingToolkit: jest.fn(),
};

const props = {
  tab: 'id',
};

describe('src/containers/ContentManagement/Product/Add-v2/lib/section/MarketingToolkit/index', () => {
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
    const tree = shallow.render(<MarketingToolkit {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[0].props.children[0].props.onChange();
    tree.props.children[1].props.children[1].props.children[1].props.children.props.children[0].props.onDelete();
  });

  test('render isDisplayProductMarketingToolkit true', () => {
    const customActions = {
      ...actions,
      isDisplayProductMarketingToolkit: true,
      previewMode: true,
    };
    const customProps = { ...props, tab: 'en' };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<MarketingToolkit {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render isDisplayProductMarketingToolkit and previewMode false', () => {
    const customActions = {
      ...actions,
      isDisplayProductMarketingToolkit: false,
      previewMode: true,
      l2Documents: [],
    };
    const customProps = { ...props, tab: 'en' };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<MarketingToolkit {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render checkTopSectionBorder', () => {
    const customActions = {
      ...actions,
      isDisplayProductMarketingToolkit: true,
      previewMode: false,
      l2Documents: [],
    };
    const customProps = { ...props, tab: 'en' };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<MarketingToolkit {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
