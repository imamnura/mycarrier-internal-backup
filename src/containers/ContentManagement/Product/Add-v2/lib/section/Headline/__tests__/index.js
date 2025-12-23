import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Headline from '../index';
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
  _control: {},
};

const props = {
  tab: 'id',
  previewMode: false,
  stepName: 'L0 - Content Page',
};

describe('src/containers/ContentManagement/Product/Add-v2/lib/section/Headline/index', () => {
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
    const tree = shallow.render(<Headline {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render L0 - Content Page tab en', () => {
    const customProps = { ...props, tab: 'en' };
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Headline {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render L1 - Content Page', () => {
    const customProps = { ...props, stepName: 'L1 - Content Page' };
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Headline {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render L1 - Content Page 2', () => {
    const customProps = { ...props, tab: 'en', stepName: 'L1 - Content Page' };
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Headline {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
