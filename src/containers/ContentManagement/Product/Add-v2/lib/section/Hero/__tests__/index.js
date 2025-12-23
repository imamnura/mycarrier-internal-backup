import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Hero from '../index';
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
  _control: {},
  file: {
    _file: null,
    _setFile: () => jest.fn(),
  },
  setFile: jest.fn,
  descriptionid: '',
  descriptionen: '',
  setEditableDesc: jest.fn(),
  handleEditableDesc: jest.fn(),
  iconHero: {
    mediaPath: 'test',
  },
  nameProduct: '',
  handleChangeIcon: jest.fn(),
};

const props = {
  tab: 'id',
  previewMode: false,
  level: 'L0 - Content Page',
};

describe('src/containers/ContentManagement/Product/Add-v2/lib/section/Hero/index', () => {
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
    const tree = shallow.render(<Hero {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab en', () => {
    const customProps = { ...props, tab: 'en' };
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Hero {...customProps} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[1].props.children[0].props.onClick();
    tree.props.children[1].props.children[0].props.children.props.getUpdateItem();
    tree.props.children[1].props.children[1].props.children[0].props.children.props.getUpdateItem();
    tree.props.children[1].props.children[2].props.children[1].props.children.props.onChange();
  });
});
