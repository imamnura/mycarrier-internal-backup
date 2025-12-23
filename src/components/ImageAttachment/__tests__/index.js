import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Attachment from '../ImageAttachment';

jest.mock('@utils/hooks/useDocumentViewer');

describe('src/components/Attachment', () => {
  beforeEach(() => {
    window.open = jest.fn();
  });

  afterEach(() => {
    window.open.mockClear();
  });

  test('render', () => {
    useDocumentViewer.mockReturnValue({ setDocumentViewer: jest.fn() });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Attachment fileUrl="sampleFile.png" />);
    tree.props.onClick();
    expect(tree).toMatchSnapshot();
  });

  test('other extension', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Attachment fileUrl="sampleFile.mp4" />);
    tree.props.onClick();
    expect(tree).toMatchSnapshot();
  });

  test('hide preview download', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <Attachment fileUrl="sampleFile.pdf" hidePreviewDownload={true} />,
    );
    tree.props.onClick();
    expect(tree).toMatchSnapshot();
  });
});
