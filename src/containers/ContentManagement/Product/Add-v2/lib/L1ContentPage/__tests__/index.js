import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import L1ContentPage from '../index';
import { cleanup } from '@testing-library/react-hooks/server';
import { useLottie } from 'lottie-react';

jest.mock('lottie-react');

const props = {
  level: '',
  tabsProps: { value: 'id', onChange: jest.fn() },
  useform: {
    control: {},
    setValue: jest.fn(),
    getValues: jest.fn(),
    watch: jest.fn(),
    resetField: jest.fn(),
  },
  previewMode: false,
  productDetailsFields: {},
  productDetailsData: {},
  stepName: '',
  l1Banner: {},
};

describe('src/containers/ContentManagement/Product/Add-v2/lib/section/L1ContentPage/index', () => {
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
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<L1ContentPage {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render previewMode true', () => {
    const customProps = { ...props, previewMode: true };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<L1ContentPage {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
