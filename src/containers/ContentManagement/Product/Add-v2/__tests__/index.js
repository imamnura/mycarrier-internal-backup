import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Add from '../Add';
import useActions from '../hooks/useActions';
import { cleanup } from '@testing-library/react-hooks/server';
import { useLottie } from 'lottie-react';
import { useRouter } from 'next/router';

jest.mock('../hooks/useActions');
jest.mock('lottie-react');
jest.mock('next/router');

const actions = {
  dataInformation: {},
  formType: '',
  steps: [],
  disableAction: false,
  setDisableAction: jest.fn(),
  step: 0,
  setStep: jest.fn(),
  tab: 'id',
  setTab: jest.fn(),
  level: '',
  setLevel: jest.fn(),
  iconFile: {},
  setIconFile: jest.fn(),
  handleUploadIcon: jest.fn(),
  keywordChip: [],
  productDetailsData: [],
  l2CategoryChip: [],
  l2MappingOptions: [],
  control: {},
  formState: {},
  handleSubmit: jest.fn(),
  setValue: jest.fn(),
  getValues: jest.fn(),
  watch: jest.fn(),
  resetField: jest.fn(),
  clearErrors: jest.fn(),
  handleAddProduct: jest.fn(),
  handleDeleteKeyword: jest.fn(),
  handleKeyDown: jest.fn(),
  confirmation: {},
  clearConfirmation: jest.fn(),
  l2TypeState: {
    l2TypeListid: [],
    setL2TypeListid: jest.fn(),
    l2TypeListen: [],
    setL2TypeListen: jest.fn(),
  },
  l2BenefitState: { l2ProductBenefits: [], setL2ProductBenefits: jest.fn() },
  l2DocumentState: { l2Documents: [], setL2Documents: jest.fn() },
  productServicesData: { id: [], en: [] },
  openPreview: false,
  setOpenPreview: jest.fn(),
  productDetailsFieldsId: [],
  productDetailsFieldsEn: [],
  isNextDisable: jest.fn(),
  isLoading: false,
  previousButton: jest.fn(),
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
  handleCancel: jest.fn(),
  filterSectionTree: {
    options: [],
    value: { value: '', label: 'Section Tree' },
  },
  l0Banner: {
    _file: {},
    _setFile: jest.fn(),
  },
  l1Banner: {
    _file: {},
    _setFile: jest.fn(),
  },
  l2Hero: {
    _file: {},
    _setFile: jest.fn(),
  },
};

const props = {
  feature: [''],
};

describe('src/containers/ContentManagement/Product/Add-v2', () => {
  afterEach(() => {
    cleanup();
  });

  beforeAll(() => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date('10 October 2022 08:08:08 UTC'));
    useLottie.mockReturnValue({});
    useRouter.mockReturnValue({
      push: jest.fn(),
      query: { level: 'l0', isSingleProduct: false },
    });
  });

  test('render', () => {
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Add {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[1].props.onClose(); //clearConfirmation
    tree.props.children[2].props.onClose(); //setOpenPreview
  });

  test('render formRender L0 - Product Information', () => {
    const customActions = {
      ...actions,
      steps: ['L0 - Product Information'],
    };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Add {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render formType full L0 - Content Page isSingleProduct', () => {
    const customActions = {
      ...actions,
      steps: ['L0 - Content Page'],
      formType: 'full',
      dataInformation: { isSingleProduct: true },
    };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Add {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render formType full L1 - Content Page isSingleProduct', () => {
    const customActions = {
      ...actions,
      steps: ['L1 - Content Page'],
      formType: 'full',
      dataInformation: { isSingleProduct: true },
    };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Add {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render formType full L0 - Content Page', () => {
    const customActions = {
      ...actions,
      steps: ['L0 - Content Page'],
      formType: 'full',
    };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Add {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render formType full L1 - Content Page', () => {
    const customActions = {
      ...actions,
      steps: ['L1 - Content Page'],
      formType: 'full',
    };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Add {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render formType full Product Detail - Content Page', () => {
    const customActions = {
      ...actions,
      steps: ['Product Detail - Content Page'],
      formType: 'full',
    };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Add {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render formType half L0 - Content Page', () => {
    const customActions = {
      ...actions,
      steps: ['L0 - Content Page'],
      formType: 'half',
    };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Add {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render formType half L1 - Content Page', () => {
    const customActions = {
      ...actions,
      steps: ['L1 - Content Page'],
      formType: 'half',
    };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Add {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render formType single L0 - Content Page', () => {
    const customActions = {
      ...actions,
      steps: ['L0 - Content Page'],
      formType: 'single',
    };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Add {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render formType create L1 - Content Page', () => {
    const customActions = {
      ...actions,
      steps: ['L1 - Content Page'],
      formType: 'create',
    };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Add {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render formType create L1 - Content Page isSingleProduct', () => {
    useRouter.mockReturnValue({
      push: jest.fn(),
      query: { level: 'l0', isSingleProduct: 'true' },
    });
    const customActions = {
      ...actions,
      steps: ['L1 - Content Page'],
      formType: 'create',
    };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Add {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render formType create L1 - Content Page 2', () => {
    const customActions = {
      ...actions,
      steps: ['Product Detail - Content Page'],
      formType: 'create',
    };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Add {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render level l2', () => {
    useRouter.mockReturnValue({
      push: jest.fn(),
      query: { level: 'l2', isSingleProduct: false },
    });
    const customActions = {
      ...actions,
      dataInformation: { catIdl0: 'test' },
    };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Add {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
