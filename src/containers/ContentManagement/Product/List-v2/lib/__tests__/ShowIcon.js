import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ShowIcon from '../ShowIcon';
import useStyles from '../../hooks/useStyles';
import { theme } from '@styles/theme';
import { useSnackbar } from 'notistack';
import { cleanup } from '@testing-library/react-hooks';
import { useRouter } from 'next/router';
import { route } from '@configs';
import { updateProduct } from '@containers/ContentManagement/Product/_repositories/repositories';

jest.mock('../../hooks/useStyles');
jest.mock('notistack');
jest.mock('@containers/ContentManagement/Product/_repositories/repositories');
jest.mock('next/router');

describe('src/containers/ContentManagement/Product/List-v2/lib/ShowIcon', () => {
  afterEach(cleanup);

  beforeAll(() => {
    useSnackbar.mockReturnValue({
      enqueueSnackbar: jest.fn(),
    });
    useRouter.mockReturnValue({
      asPath: route.productManage('list'),
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
    isDisplay: false,
    feature: ['update_showhide'],
    onShowHideProduct: jest.fn(),
    isShowProduct: false,
    stopPropagation: jest.fn(),
  };

  test('run properly', () => {
    updateProduct.mockResolvedValue(resolvedDetail);

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ShowIcon {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.onClick({ stopPropagation: jest.fn() });
    tree.props.children.props.onChange(1, false);
  });

  test('run properly isDisplay to be false', () => {
    updateProduct.mockResolvedValue({
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
    updateProduct.mockRejectedValue({ success: false });

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

  test('updateProduct have access and failed', () => {
    updateProduct.mockRejectedValue(resolvedDetail);

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ShowIcon {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.onClick({ stopPropagation: jest.fn() });
    tree.props.children.props.onChange(1, true);
  });

  test('render style', () => {
    expect(useStyles(theme)).not.toBeNull();
  });
});
