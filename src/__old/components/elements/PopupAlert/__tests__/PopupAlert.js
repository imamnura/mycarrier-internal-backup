import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import PopupAlert from '../PopupAlert';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';
import { useSelector } from 'react-redux';

configure({ adapter: new Adapter() });
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('src/components/elements/PopupAlert', () => {
  const props = {
    success: true,
  };

  test('render success', () => {
    useSelector.mockImplementation((selectorFn) =>
      selectorFn({ popupAlert: { data: [] } }),
    );
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PopupAlert {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render info', () => {
    useSelector.mockImplementation((selectorFn) =>
      selectorFn({ popupAlert: { data: [] } }),
    );
    const customProps = { info: true };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PopupAlert {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render fail', () => {
    useSelector.mockImplementation((selectorFn) =>
      selectorFn({ popupAlert: { data: [] } }),
    );
    const customProps = { info: false, success: false };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PopupAlert {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
