import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ProductDetail from '../index';
import useStyles from '../styles';
import { cleanup } from '@testing-library/react-hooks/server';
import { useLottie } from 'lottie-react';

jest.mock('../styles');
jest.mock('lottie-react');
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const props = {
  tab: 'id',
  data: {
    en: [{ title: 'test' }, { title: 'test2' }],
    id: [{ title: 'test' }, { title: 'test2' }],
  },
  useform: { _control: {} },
  previewMode: false,
  level: '',
  products: {
    id: [{ title: 'test' }, { title: 'test2' }],
    en: [{ title: 'test' }, { title: 'test2' }],
  },
};

describe('src/containers/ContentManagement/Product/Add-v2/lib/section/ProductDetail/index', () => {
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
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProductDetail {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render cardList', () => {
    const customProps = {
      ...props,
      products: {
        id: [
          {
            title: 'test',
            cardList: [
              {
                description: 'test description',
                title: 'test',
                imageUrl: 'test',
              },
            ],
          },
        ],
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProductDetail {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab id previewMode true', () => {
    const customProps = { ...props, tab: 'en', previewMode: true };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProductDetail {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab en', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProductDetail {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
