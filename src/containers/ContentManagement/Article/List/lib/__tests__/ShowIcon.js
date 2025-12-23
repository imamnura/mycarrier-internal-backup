import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ShowIcon from '../ShowIcon';
import useStyles from '../../hooks/useStyles';
import { theme } from '@styles/theme';
import { useSnackbar } from 'notistack';
import { cleanup } from '@testing-library/react-hooks';
import { useRouter } from 'next/router';
import { route } from '@configs';
import { submitArticle } from '@containers/ContentManagement/Article/_repositories/repositories';

jest.mock('../../hooks/useStyles');
jest.mock('notistack');
jest.mock('@containers/ContentManagement/Article/_repositories/repositories');
jest.mock('next/router');

describe('src/containers/ContentManagement/Article/List/lib/ShowIcon', () => {
  afterEach(cleanup);

  beforeAll(() => {
    useSnackbar.mockReturnValue({
      enqueueSnackbar: jest.fn(),
    });
    useRouter.mockReturnValue({
      asPath: route.article('list'),
      push: jest.fn(),
    });
  });

  const resolvedDetail = {
    data: {
      id: 1,
      isDisplay: true,
    },
  };

  const props = {
    id: 123,
    displayArticle: false,
    feature: ['update_showhide'],
    onShowHideArticle: jest.fn(),
    isShowArticle: false,
    stopPropagation: jest.fn(),
  };

  test('run properly', () => {
    submitArticle.mockResolvedValue(resolvedDetail);

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ShowIcon {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.onClick({ stopPropagation: jest.fn() });
    tree.props.children.props.onChange(1, false);
  });

  test('run properly isDisplay to be false', () => {
    submitArticle.mockResolvedValue({
      data: {
        id: 1,
        isDisplay: false,
      },
    });

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ShowIcon {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.onClick({ stopPropagation: jest.fn() });
    tree.props.children.props.onChange(1, true);
  });

  test('run properly not access', () => {
    submitArticle.mockRejectedValue({ success: false });

    const customProps = {
      ...props,
      feature: [''],
    };

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ShowIcon {...customProps} />);
    expect(tree).toMatchSnapshot();

    tree.props.onClick({ stopPropagation: jest.fn() });
    tree.props.children.props.onChange(1, true);
  });

  test('render style', () => {
    expect(useStyles(theme)).not.toBeNull();
  });
});
