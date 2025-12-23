import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SectionMark from '../SectionMark';

describe('src/containers/ContentManagement/Events/Add-v2/lib/components/SectionMark/index', () => {
  const props = {
    title: 'test',
    description: 'test',
    nonmandatory: true,
    onChange: jest.fn(),
    isDisplay: true,
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SectionMark {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
