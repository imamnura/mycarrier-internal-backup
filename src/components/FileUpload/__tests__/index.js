import usePopupAlert from '@utils/hooks/usePopupAlert';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import FileUpload from '../FileUpload';

jest.mock('@utils/hooks/usePopupAlert');

describe('src/components/FileUpload', () => {
  test('render', () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    global.URL.createObjectURL = jest.fn().mockReturnValue('url');
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <FileUpload
        accept={['.png']}
        label="label"
        onChange={jest.fn()}
        required
      />,
    );

    tree.props.children[2].props.children[2].props.onChange({
      persist: jest.fn(),
      preventDefault() {},
      target: { files: [] },
    });
    tree.props.children[2].props.children[2].props.onChange({
      persist: jest.fn(),
      preventDefault() {},
      target: { files: [{ size: 1 }] },
    });

    expect(tree).toMatchSnapshot();
  });

  test('maxSize', () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <FileUpload
        accept={['.png']}
        customValidate={({ name }) => {
          if (name === 'tes') {
            return {
              passed: false,
              message: 'message',
            };
          } else {
            return {
              passed: true,
              message: 'message',
            };
          }
        }}
        fetcher={jest.fn().mockResolvedValue({ data: { fileUrl: 'url' } })}
        label="label"
        maxSize={10}
        onChange={jest.fn()}
        required
      />,
    );

    tree.props.children[2].props.children[2].props.onChange({
      persist: jest.fn(),
      preventDefault() {},
      target: { files: [{ name: 'tes', size: 11 }] },
    });
    tree.props.children[2].props.children[2].props.onChange({
      persist: jest.fn(),
      preventDefault() {},
      target: { files: [{ name: 'tes', size: 1 }] },
    });
    tree.props.children[2].props.children[2].props.onChange({
      persist: jest.fn(),
      preventDefault() {},
      target: { files: [{ name: 'xtes', size: 1 }] },
    });

    expect(tree).toMatchSnapshot();
  });

  test('delete', () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    global.URL.createObjectURL = jest.fn().mockReturnValue('url');
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <FileUpload
        accept={['.png']}
        fetcher={jest.fn().mockRejectedValue()}
        label="label"
        onChange={jest.fn()}
        required
        value={{
          url: 'url',
          fileName: 'file.png',
        }}
      />,
    );

    tree.props.children[2].props.children[1].props.onClick();

    expect(tree).toMatchSnapshot();
  });

  test('failed upload', () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    global.URL.createObjectURL = jest.fn().mockReturnValue('url');
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <FileUpload
        accept={['.png']}
        fetcher={jest.fn().mockRejectedValue({ message: 'error' })}
        label="label"
        onChange={jest.fn()}
        required
      />,
    );

    tree.props.children[2].props.children[2].props.onChange({
      persist: jest.fn(),
      preventDefault() {},
      target: { files: [{ size: 1 }] },
    });

    expect(tree).toMatchSnapshot();
  });
});
