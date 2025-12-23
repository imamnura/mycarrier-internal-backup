import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ProductOverview from '../index';
import useActions from '../hooks/useActions';
import { cleanup } from '@testing-library/react-hooks/server';
import { useLottie } from 'lottie-react';

jest.mock('../hooks/useActions');
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
  level: 'l2',
  previewMode: false,
  tab: 'id',
};

describe('src/containers/ContentManagement/Product/Add-v2/lib/section/ProductOverview/index', () => {
  afterEach(() => {
    cleanup();
  });

  beforeAll(() => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date('10 October 2022 08:08:08 UTC'));
    useLottie.mockReturnValue({});
  });

  test('render', () => {
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProductOverview {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab id previewMode true', () => {
    const customProps = { ...props, previewMode: true };
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProductOverview {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab en', () => {
    const customProps = { ...props, tab: 'en' };
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProductOverview {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab en previewMode true', () => {
    const customProps = { ...props, tab: 'en', previewMode: true };
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProductOverview {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
