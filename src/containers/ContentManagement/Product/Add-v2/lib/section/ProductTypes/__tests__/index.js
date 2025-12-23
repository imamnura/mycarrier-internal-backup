import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ProductTypes from '../index';
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
  _getValues: jest.fn(),
  formState: { isValid: false, isDirty: false },
  fieldsId: [
    {
      id: 1,
      title: 'test',
      description: 'test',
    },
  ],
  fieldsEn: [
    {
      id: 2,
      title: 'test',
      description: 'test',
    },
  ],
  handleAddType: jest.fn(),
  handleDelete: jest.fn(),
  isDisplayProductType: false,
  setIsDisplayProductType: jest.fn(),
};

const props = {
  tab: 'id',
  level: '',
  previewMode: false,
};

describe('src/containers/ContentManagement/Product/Add-v2/lib/section/ProductTypes/index', () => {
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
    const tree = shallow.render(<ProductTypes {...props} />);
    expect(tree).toMatchSnapshot();
    tree.props.children[0].props.onChange(); //setIsDisplayProductType
    tree.props.children[1].props.children[1].props.children.props.children[0][0].props.children.props.children[2].props.onClick(); //handleDelete
  });

  test('render tab en', () => {
    const customProps = { ...props, tab: 'en' };
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProductTypes {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render null data', () => {
    const customActions = { ...actions, fieldsId: [], fieldsEn: [] };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProductTypes {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render null data previewMode true', () => {
    const customActions = { ...actions, fieldsId: [], fieldsEn: [] };
    const customProps = { ...props, previewMode: true };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProductTypes {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab en previewMode true', () => {
    const customActions = { ...actions, isDisplayProductType: true };
    const customProps = { ...props, previewMode: true, tab: 'en' };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProductTypes {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab id previewMode true', () => {
    const customActions = { ...actions, isDisplayProductType: true };
    const customProps = { ...props, previewMode: true };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProductTypes {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
