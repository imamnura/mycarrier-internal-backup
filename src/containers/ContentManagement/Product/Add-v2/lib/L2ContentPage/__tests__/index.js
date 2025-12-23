import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import L2ContentPage from '../index';
import { cleanup } from '@testing-library/react-hooks/server';
import { useLottie } from 'lottie-react';

jest.mock('lottie-react');

const props = {
  formType: '',
  level: '',
  tabsProps: { value: 'id', onChange: jest.fn() },
  useform: {
    control: {},
    formState: {},
    setValue: jest.fn(),
    getValues: jest.fn(),
    watch: jest.fn(),
    resetField: jest.fn(),
  },
  l2DocumentState: {},
  previewMode: false,
  isDisplayProductType: true,
  setIsDisplayProductType: jest.fn(),
  isDisplayProductBenefits: true,
  setIsDisplayProductBenefits: jest.fn(),
  isDisplayProductSpesifications: true,
  setIsDisplayProductSpesifications: jest.fn(),
  isDisplayProductQuality: true,
  setIsDisplayProductQuality: jest.fn(),
  isDisplayProductGuarantee: true,
  setIsDisplayProductGuarantee: jest.fn(),
  isDisplayProductMarketingToolkit: true,
  setIsDisplayProductMarketingToolkit: jest.fn(),
  filterSectionTree: {},
  l2Hero: {},
};

describe('src/containers/ContentManagement/Product/Add-v2/lib/section/L2ContentPage/index', () => {
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
    const tree = shallow.render(<L2ContentPage {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render previewMode true', () => {
    const customProps = { ...props, previewMode: true };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<L2ContentPage {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
