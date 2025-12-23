import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import PageViewer from '../PageViewer';

describe('src/containers/ContentManagement/Events/Add-v2/lib/components/PageViewer/index', () => {
  const props = {
    onClose: jest.fn(),
    actionButton: jest.node,
    title: 'test',
    open: true,
    eventId: 'test',
    idPreviewPage: 'test',
    tab: 'id',
    classes: {},
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PageViewer {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab en', () => {
    const customProps = { ...props, tab: 'en' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PageViewer {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render actionButton not null', () => {
    const customProps = { ...props, actionButton: {} };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PageViewer {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render eventId null', () => {
    const customProps = { ...props, eventId: '' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PageViewer {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
