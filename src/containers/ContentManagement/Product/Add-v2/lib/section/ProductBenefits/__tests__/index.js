import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ProductBenefits from '../index';
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
  control: {},
  formState: { isValid: false, isDirty: false },
  fieldsId: [
    {
      id: 1,
      imageUrl: {
        mediaName: 'images',
        mediaPath: 'images',
      },
    },
  ],
  fieldsEn: [
    {
      id: 2,
      imageUrl: {
        mediaName: 'images',
        mediaPath: 'images',
      },
    },
  ],
  handleAddBenefit: jest.fn(),
  handleDelete: jest.fn(),
  handleUploadImage: jest.fn(),
  file: {},
  setFile: jest.fn(),
  isDisplayProductBenefits: false,
  setIsDisplayProductBenefits: jest.fn(),
};

const props = {
  tab: 'id',
  level: '',
  previewMode: false,
};

describe('src/containers/ContentManagement/Product/Add-v2/lib/section/ProductBenefits/index', () => {
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
    const tree = shallow.render(<ProductBenefits {...props} />);
    expect(tree).toMatchSnapshot();
    tree.props.children[0].props.onChange(); //setIsDisplayProductBenefits
    tree.props.children[1].props.children[1].props.children.props.children[0][0].props.children.props.children[1].props.onClick(); //delete icon
  });

  test('render tab en', () => {
    const customProps = { ...props, tab: 'en' };
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProductBenefits {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render null data', () => {
    const customActions = { ...actions, fieldsId: [], fieldsEn: [] };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProductBenefits {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab en 2', () => {
    const customActions = { ...actions, isDisplayProductBenefits: true };
    const customProps = { ...props, previewMode: true };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProductBenefits {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
