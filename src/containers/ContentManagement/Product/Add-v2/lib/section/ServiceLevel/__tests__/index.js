import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ServiceLevel from '../index';
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
  handleAddType: jest.fn(),
  handleDelete: jest.fn(),
  handleUploadImage: jest.fn(),
  file: {},
  setFile: jest.fn(),
  isDisplayProductGuarantee: false,
  setIsDisplayProductGuarantee: jest.fn(),
};

const props = {
  tab: 'id',
  level: '',
  previewMode: false,
};

describe('src/containers/ContentManagement/Product/Add-v2/lib/section/ServiceLevel/index', () => {
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
    const tree = shallow.render(<ServiceLevel {...props} />);
    expect(tree).toMatchSnapshot();
    tree.props.children[0].props.onChange(); //setIsDisplayProductGuarantee
    tree.props.children[1].props.children[1].props.children[0][0].props.children.props.children[2].props.onClick();
  });

  test('render tab en', () => {
    const customProps = { ...props, tab: 'en' };
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ServiceLevel {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render null data', () => {
    const customActions = { ...actions, fieldsId: [], fieldsEn: [] };
    const customProps = { ...props, previewMode: true };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ServiceLevel {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab en 2', () => {
    const customActions = { ...actions, isDisplayProductGuarantee: true };
    const customProps = { ...props, previewMode: true };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ServiceLevel {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
