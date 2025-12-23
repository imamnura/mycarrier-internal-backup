import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ProductAndServices from '../index';
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
  data: {
    id: [
      { title: 'test', description: 'test' },
      { title: 'test 2', description: 'test 2' },
    ],
    en: [
      { title: 'test', description: 'test' },
      { title: 'test 2', description: 'test 2' },
    ],
  },
  tab: 'id',
  level: '',
  previewMode: false,
};

describe('src/containers/ContentManagement/Product/Add-v2/lib/section/ProductAndServices/index', () => {
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
    const tree = shallow.render(<ProductAndServices {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab id no data', () => {
    useActions.mockReturnValue(actions);
    const customProps = { ...props, data: { id: [], en: [] } };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProductAndServices {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab en', () => {
    const customProps = { ...props, tab: 'en' };
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProductAndServices {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab en no data', () => {
    useActions.mockReturnValue(actions);
    const customProps = { ...props, data: { id: [], en: [] }, tab: 'en' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProductAndServices {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
