import React from 'react';
import { cleanup } from '@testing-library/react-hooks/server';
import ShallowRenderer from 'react-test-renderer/shallow';
import UploadImage from '../image';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { getUrlMedia } from '@containers/ContentManagement/Events/_repositories/repositories';

jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@containers/ContentManagement/Events/_repositories/repositories');

describe('src/containers/ContentManagement/Events/Add-v2/lib/components/Image/image', () => {
  afterEach(() => {
    cleanup();
  });

  beforeAll(() => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
  });

  const props = {
    feature: [''],
    isLoading: false,
    disabled: false,
    getUpdateItem: jest.fn(),
    isValidateByPixel: false,
    item: null,
    maxSize: 358400,
    previewState: {},
    ratioPixel: [32, 32],
    sectionName: 'test',
    sizeBig: false,
    type: 'large',
    wordingImage: 'test',
    wordingVariant: 'h4',
  };

  test('onChange image default', () => {
    const file = {
      target: {
        files: [
          { size: 358400, name: 'test' },
          { size: 358400, name: 'test 2' },
        ],
      },
    };

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<UploadImage {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[1].props.onChange(file);
  });

  test('onChange image maxSize', () => {
    const file = {
      target: {
        files: [
          { size: 400000, name: 'test' },
          { size: 400000, name: 'test 2' },
        ],
      },
    };

    const customProps = {
      ...props,
      disabled: true,
      item: {},
    };

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<UploadImage {...customProps} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[1].props.onChange(file);
  });

  test('onChange image failed', () => {
    const file = { target: { files: [] } };

    const customProps = {
      ...props,
      disabled: true,
      item: {},
      isValidateByPixel: true,
    };

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<UploadImage {...customProps} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[1].props.onChange(file);
  });

  test('onChange image item', () => {
    getUrlMedia.mockResolvedValue(
      { mediaPath: 'test', mediaName: 'test', mediaId: 'test' },
      'background',
    );

    const file = {
      target: {
        files: [
          { size: 400000, name: 'test' },
          { size: 400000, name: 'test 2' },
        ],
      },
    };

    const customProps = {
      ...props,
      item: { mediaPath: 'test', mediaName: 'test', mediaId: 'test' },
    };

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<UploadImage {...customProps} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[1].props.onChange(file);
  });

  test('onChange image isValidateByPixel', () => {
    global.URL.createObjectURL = jest.fn().mockReturnValue('url');
    const file = {
      target: {
        files: [
          { size: 200000, name: 'test' },
          { size: 200000, name: 'test 2' },
        ],
      },
    };

    const customProps = {
      ...props,
      disabled: true,
      item: {},
      isValidateByPixel: true,
      initialPreview: 'test',
      type: 'background',
    };

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<UploadImage {...customProps} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[1].props.onChange(file);
  });
});
