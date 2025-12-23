import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import QualityService from '../index';
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
  descriptionid: 'test',
  descriptionen: 'test',
  handleEditableDesc: jest.fn(),
  isDisplayProductQuality: false,
  setIsDisplayProductQuality: jest.fn(),
};

const props = {
  tab: 'id',
  level: '',
  previewMode: false,
};

describe('src/containers/ContentManagement/Product/Add-v2/lib/section/QualityService/index', () => {
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
    const tree = shallow.render(<QualityService {...props} />);
    expect(tree).toMatchSnapshot();
    tree.props.children[0].props.onChange(); //setIsDisplayProductQuality
    tree.props.children[1].props.children[1].props.children.props.children.props.onChange(); //handleEditableDesc
  });

  test('render tab en', () => {
    const customProps = { ...props, tab: 'en' };
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<QualityService {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render null', () => {
    const customProps = { ...props, previewMode: true };
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<QualityService {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab en previewMode true', () => {
    const customActions = { ...actions, isDisplayProductQuality: true };
    const customProps = { ...props, previewMode: true, tab: 'en' };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<QualityService {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab id previewMode true', () => {
    const customActions = { ...actions, isDisplayProductQuality: true };
    const customProps = { ...props, previewMode: true };
    useActions.mockReturnValue(customActions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<QualityService {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
