import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ReadMore from '../component';
describe('Read More Test', () => {
  it('render case 1', () => {
    const props = {
      text: 'tes1234567890123456',
      readMoreCharacterLimit: 10,
      showLessButton: true,
      classes: {},
    };
    const shallow = new ShallowRenderer();
    const wrapper = shallow.render(<ReadMore {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render case 2', () => {
    const props = {
      showLessButton: true,
      classes: {},
    };
    const shallow = new ShallowRenderer();
    const wrapper = shallow.render(<ReadMore {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render case 3', () => {
    const props = {
      text: 'tes1234567890123456',
      readMoreCharacterLimit: 10,
      showLessButton: false,
      classes: {},
    };
    const shallow = new ShallowRenderer();
    const wrapper = shallow.render(<ReadMore {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
