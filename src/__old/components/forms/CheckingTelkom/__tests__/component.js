import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import CheckingTelkom from '../component';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

describe('src/components/forms/CheckingTelkom', () => {
  const props = {
    classes: {},
    getDownload: jest.fn(),
    handleSubmit: jest.fn(),
    id: '',
    onClose: jest.fn(),
    provider: '',
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CheckingTelkom {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('componentDidMount', () => {
    const tree = shallow(<CheckingTelkom {...props} />);
    const instance = tree.instance();
    instance.componentDidMount();
    expect(props.getDownload).toHaveBeenCalled();
  });
});
