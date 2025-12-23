import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Component from '../component';

describe('src/containers/ContentManagement/Events/Add-v2/lib/components/SectionTree/index', () => {
  const props = {
    filterOptions: [],
    filterValue: {},
    filterWidth: 300,
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
