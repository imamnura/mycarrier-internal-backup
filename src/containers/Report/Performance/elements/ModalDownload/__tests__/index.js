import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ModalDownload from '../ModalDownload';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/Report/Performance/elements/ModalDownload', () => {
  const props = {
    open: false,
    title: 'test',
    textInfo: 'test',
    caption: 'test',
    submitText: 'test',
  };

  const useActionReturn = {
    filter: [
      {
        type: 'dropdown',
        label: 'test',
        required: true,
        filterProps: { onChange: jest.fn() },
      },
    ],
    loading: false,
    onClose: jest.fn(),
    onClickDownload: jest.fn(),
  };

  test('render', () => {
    useActions.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ModalDownload {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render type filter dateRange', () => {
    useActions.mockReturnValue({
      ...useActionReturn,
      filter: [{ type: 'dateRange', label: 'test', required: true }],
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ModalDownload {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render type filter date', () => {
    useActions.mockReturnValue({
      ...useActionReturn,
      filter: [{ type: 'date', label: 'test', required: true }],
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ModalDownload {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render type filter others', () => {
    useActions.mockReturnValue({
      ...useActionReturn,
      filter: [{ type: 'others', label: 'test', required: true }],
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ModalDownload {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render submitText null', () => {
    const customProps = {
      open: false,
      title: 'test',
      textInfo: 'test',
      caption: 'test',
      submitText: '',
    };
    useActions.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ModalDownload {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
