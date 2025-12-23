import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ShowIcon from '../ShowIcon';
import { useSnackbar } from 'notistack';
import { cleanup } from '@testing-library/react-hooks';
import { useRouter } from 'next/router';
import { route } from '@configs';
import { updateShowHide } from '@containers/ContentManagement/Homepage/_repositories/repositories';

jest.mock('notistack');
jest.mock('@containers/ContentManagement/Homepage/_repositories/repositories');
jest.mock('next/router');

describe('src/containers/ContentManagement/Homepage/List/lib/ShowIcon', () => {
  afterEach(cleanup);

  beforeAll(() => {
    useSnackbar.mockReturnValue({
      enqueueSnackbar: jest.fn(),
    });
    useRouter.mockReturnValue({
      asPath: route.homepageManagement('list'),
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
    displayBanner: false,
    feature: ['update_showhide'],
    onShowHideBanner: jest.fn(),
    isShowBanner: false,
    stopPropagation: jest.fn(),
  };

  test('run properly', () => {
    updateShowHide.mockResolvedValue(resolvedDetail);

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ShowIcon {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.onClick({ stopPropagation: jest.fn() });
    tree.props.children.props.onChange(1, false);
  });

  test('run properly isDisplay to be false', () => {
    updateShowHide.mockResolvedValue({
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
    updateShowHide.mockRejectedValue({ success: false });

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
});
