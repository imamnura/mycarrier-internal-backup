import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ImageAttachment from '../component';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

describe('src/components/elements/ImageAttachment', () => {
  const props = {
    classes: {
      file: 'file',
    },
    fileName: '-',
    label: 'label',
    type: 'ZIP',
    url: '',
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ImageAttachment {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('handel download', () => {
    window.open = jest.fn();
    const tree = shallow(<ImageAttachment {...props} />);
    tree.find({ className: 'file' }).props().onClick();
    expect(window.open).toHaveBeenCalled();
  });
});
