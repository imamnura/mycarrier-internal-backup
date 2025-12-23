import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Banner from '../index';
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
  handleUploadImage: jest.fn(),
  _control: {},
  file: {
    _file: null,
    _setFile: () => jest.fn(),
  },
  setFile: jest.fn(),
};

const props = {
  tab: 'id',
  previewMode: false,
  stepName: 'L0 - Content Page',
};

describe('src/containers/ContentManagement/Product/Add-v2/lib/section/Banner/index', () => {
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

  test('render L0 - Content Page', () => {
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Banner {...props} />);
    expect(tree).toMatchSnapshot();
    tree.props.children[1].props.children[0].props.onClick(); //setEditableDesc
  });

  test('render L0 - Content Page tab en', () => {
    const customProps = { ...props, tab: 'en' };
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Banner {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render L1 - Content Page', () => {
    const customProps = { ...props, stepName: 'L1 - Content Page' };
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Banner {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render L1 - Content Page 2', () => {
    const customProps = { ...props, tab: 'en', stepName: 'L1 - Content Page' };
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Banner {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
