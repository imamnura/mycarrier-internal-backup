import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import FileAttachment from '../component';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

describe('src/components/elements/FileAttachment', () => {
  const props = {
    classes: {
      file: 'file',
    },
    fileName: '-',
    label: 'label',
    url: '',
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<FileAttachment {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render with action button', () => {
    const customProps = {
      ...props,
      actionButton: [
        {
          onClick: jest.fn(),
          label: 'Test',
        },
      ],
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<FileAttachment {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render with type default', () => {
    const customProps = {
      ...props,
      type: '',
      actionButton: [
        {
          onClick: jest.fn(),
          label: 'Test',
        },
      ],
    };
    const tree = shallow(<FileAttachment {...customProps} />);
    const Icon = tree.find('Icon').dive();
    expect(Icon).toMatchSnapshot();
  });

  test('render with type PDF', () => {
    const customProps = {
      ...props,
      type: 'PDF',
      actionButton: [
        {
          onClick: jest.fn(),
          label: 'Test',
        },
      ],
    };
    const tree = shallow(<FileAttachment {...customProps} />);
    const Icon = tree.find('Icon').dive();
    expect(Icon).toMatchSnapshot();
  });

  test('render with type ZIP', () => {
    const customProps = {
      ...props,
      type: 'ZIP',
      actionButton: [
        {
          onClick: jest.fn(),
          label: 'Test',
        },
      ],
    };
    const tree = shallow(<FileAttachment {...customProps} />);
    const Icon = tree.find('Icon').dive();
    expect(Icon).toMatchSnapshot();
  });

  test('render with type PNG', () => {
    const customProps = {
      ...props,
      type: 'PNG',
      actionButton: [
        {
          onClick: jest.fn(),
          label: 'Test',
        },
      ],
    };
    const tree = shallow(<FileAttachment {...customProps} />);
    const Icon = tree.find('Icon').dive();
    expect(Icon).toMatchSnapshot();
  });

  test('onClick', () => {
    const customProps = {
      ...props,
      type: 'ZIP',
      actionButton: [
        {
          onClick: jest.fn(),
          label: 'Test',
        },
      ],
    };
    window.open = jest.fn();
    const handleDownload = jest.fn();
    const tree = shallow(
      <FileAttachment {...customProps} onClick={handleDownload} />,
    );
    tree.find('.file').simulate('click');
    expect(window.open).toHaveBeenCalled();
  });
});
