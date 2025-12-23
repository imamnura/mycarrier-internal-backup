import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import PreviewPage from '../index';
import useActions from '../hooks/useActions';
import { cleanup } from '@testing-library/react-hooks/server';
import { useLottie } from 'lottie-react';

jest.mock('../hooks/useActions');
jest.mock('lottie-react');

const actions = {
  data: { name: 'test' },
  dataInformation: { isSingleProduct: true },
  formType: 'edit',
  steps: [
    'L0 - Product Information',
    'L0 - Content Page',
    'L1 - Product Information',
    'L1 - Content Page',
    'Product Detail - Product Information',
    'Product Detail - Content Page',
  ],
  step: '',
  level: 'l0',
  tab: 'id',
  setTab: jest.fn(),
  productDetailsData: { id: [], en: [] },
  control: {},
  formState: {},
  setValue: jest.fn(),
  getValues: jest.fn(),
  watch: jest.fn(),
  resetField: jest.fn(),
  l2TypeState: {},
  l2BenefitState: {},
  l2DocumentState: {},
  productServicesData: { id: [], en: [] },
  openPreview: false,
  setOpenPreview: jest.fn(),
  productDetailsFieldsId: {},
  productDetailsFieldsEn: {},
  isDisplayProductType: false,
  setIsDisplayProductType: jest.fn(),
  isDisplayProductBenefits: false,
  setIsDisplayProductBenefits: jest.fn(),
  isDisplayProductSpesifications: false,
  setIsDisplayProductSpesifications: jest.fn(),
  isDisplayProductQuality: false,
  setIsDisplayProductQuality: jest.fn(),
  isDisplayProductGuarantee: false,
  setIsDisplayProductGuarantee: jest.fn(),
  isDisplayProductMarketingToolkit: false,
  setIsDisplayProductMarketingToolkit: jest.fn(),
};

const props = {
  data: { name: 'test' },
  levelDetail: '',
  stepDetail: 0,
  openPreviewState: { openPreview: false, setOpenPreview: jest.fn() },
};

describe('src/containers/ContentManagement/Product/Detail/Elements/PreviewPage/index', () => {
  afterEach(() => {
    cleanup();
  });

  beforeAll(() => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date('10 October 2022 08:08:08 UTC'));
    useLottie.mockReturnValue({});
  });

  test('render l0', () => {
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PreviewPage {...props} />);
    expect(tree).toMatchSnapshot();
    tree.props.onClose();
  });

  test('render l0 isSingleProduct false', () => {
    const customActions = {
      ...actions,
      dataInformation: { isSingleProduct: false },
    };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PreviewPage {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render l1', () => {
    const customActions = { ...actions, level: 'l1' };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PreviewPage {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render l1 isSingleProduct false', () => {
    const customActions = {
      ...actions,
      level: 'l1',
      dataInformation: { isSingleProduct: false },
    };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PreviewPage {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render l2', () => {
    const customActions = { ...actions, level: 'l2' };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PreviewPage {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render null', () => {
    const customActions = { ...actions, level: 'l3' };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PreviewPage {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
