import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Component from '../component';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';
import { ResponsivePie } from '@nivo/pie';

configure({ adapter: new Adapter() });

describe('src/components/elements/PieChart', () => {
  const props = {
    data: [{ label: 'label', color: 'color' }],
    percent: true,
    classes: {},
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('handle change percent true', () => {
    const tree = shallow(<Component {...props} />);
    tree.find(ResponsivePie).props().valueFormat(12);
  });

  test('handle change percent false', () => {
    const customProps = {
      ...props,
      percent: false,
    };
    const tree = shallow(<Component {...customProps} />);
    tree.find(ResponsivePie).props().valueFormat(12);
  });
});
