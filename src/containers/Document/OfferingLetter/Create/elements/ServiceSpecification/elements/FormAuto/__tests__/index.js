import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import FormAuto from '../FormAuto';

describe('src/containers/Document/OfferingLetter/Create/elements/ServiceSpecification/elements/FormAuto/index', () => {
  test('render', () => {
    const props = { serviceName: { value: '' } };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<FormAuto {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render ASTINET', () => {
    const props = { serviceName: { value: 'ASTINET' } };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<FormAuto {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render IP TRANSIT', () => {
    const props = { serviceName: { value: 'IP TRANSIT' } };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<FormAuto {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render VPN IP', () => {
    const props = { serviceName: { value: 'VPN IP' } };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<FormAuto {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render METRO E', () => {
    const props = { serviceName: { value: 'METRO E' } };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<FormAuto {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render CNDC', () => {
    const props = { serviceName: { value: 'CNDC' } };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<FormAuto {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
