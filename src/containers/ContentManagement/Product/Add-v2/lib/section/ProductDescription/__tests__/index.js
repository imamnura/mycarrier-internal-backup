import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ProductDescription from '../index';
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
  handleUploadImage: jest.fn(),
  setFile: jest.fn(),
  previewMode: false,
  _control: {},
  handleDelete: jest.fn(),
  addSection: jest.fn(),
  sectionDataId: [
    { imageUrl: 'test', description: 'test' },
    { imageUrl: 'test', description: 'test' },
  ],
  sectionDataEn: [
    { imageUrl: 'test', description: 'test' },
    { imageUrl: 'test', description: 'test' },
  ],
  handleDescription: jest.fn(),
};

const props = {
  tab: 'id',
  level: '',
};

describe('src/containers/ContentManagement/Product/Add-v2/lib/section/ProductDescription/index', () => {
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
    const tree = shallow.render(<ProductDescription {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[1].props.children[0][0].props.children[1].props.children[0].props.children.props.children.props.children.props.getUpdateItem(); //handleUploadImage
    tree.props.children[1].props.children[0][0].props.children[1].props.children[1].props.children.props.children[1].props.children.props.onChange(); //handleDescription
  });

  test('render tab id previewMode true', () => {
    const customActions = { ...actions, previewMode: true };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProductDescription {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab en', () => {
    const customProps = { ...props, tab: 'en' };
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProductDescription {...customProps} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[1].props.children[1][1].props.children.props.children[1].props.children.props.children[1].props.children.props.onChange();
  });

  test('render tab en previewMode true', () => {
    const customProps = { ...props, tab: 'en' };
    const customActions = { ...actions, previewMode: true };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProductDescription {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render null data', () => {
    const customActions = { ...actions, sectionDataId: [], sectionDataEn: [] };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProductDescription {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
