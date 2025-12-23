import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import DetailRequestSection from '../component';

describe('src/components/fragments/DetailRequestSection', () => {
  const props = {
    classes: {},
    breadcrumb: [],
    errorMessage: {},
    schema: {},
    stepperProps: {},
    status: {
      data: {},
      custom: jest.fn(),
    },
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DetailRequestSection {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
